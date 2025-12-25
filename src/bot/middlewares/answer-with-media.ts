import type { Context } from '#root/bot/context.js'
import type { Case } from '#root/database/queries.js'
import type { Middleware } from 'grammy'
import type { InputMediaAudio, InputMediaPhoto, InputMediaVideo } from 'grammy/types'
import { getMediaForMessage } from '#root/database/queries.js'
import { InlineKeyboard } from 'grammy'

async function answerWithMedia(ctx: Context, text: string, messageId: string | Case, keyboard: InlineKeyboard = InlineKeyboard.from([])) {
  const media = []
  if (typeof messageId === 'string') {
    media.push(...await getMediaForMessage(messageId, ctx.db))
  }
  else {
    if (messageId.videonote) {
      media.push({ media_type: 'video_note', file_id: messageId.videonote })
    }
    if (messageId.audionote) {
      media.push({ media_type: 'voice', file_id: messageId.audionote })
    }
    if (messageId.audio) {
      media.push({ media_type: 'audio', file_id: messageId.audio })
    }
    if (messageId.photo) {
      media.push({ media_type: 'photo', file_id: messageId.photo })
    }
    if (messageId.video) {
      media.push({ media_type: 'video', file_id: messageId.video })
    }
    if (messageId.caption) {
      text = messageId.caption
    }
  }
  if (media && media.length > 0) {
    try {
      await ctx.editMessageReplyMarkup(undefined)
    }
    catch (e) {
      ctx.logger.error('Failed to remove inline keyboard:', e)
    }
    if (media.length === 1) {
      const m = media[0]
      switch (m.media_type) {
        case 'photo':
          return ctx.replyWithPhoto(m.file_id, { caption: text, reply_markup: keyboard })
        case 'video':
          return ctx.replyWithVideo(m.file_id, { caption: text, reply_markup: keyboard })
        case 'video_note':
          await ctx.replyWithVideoNote(m.file_id)
          return ctx.reply(text, { reply_markup: keyboard })
        case 'audio':
          return ctx.replyWithAudio(m.file_id, { caption: text, reply_markup: keyboard })
        case 'voice':
          return ctx.replyWithVoice(m.file_id, { caption: text, reply_markup: keyboard })
        default:
          return ctx.replyWithDocument(m.file_id, { caption: text, reply_markup: keyboard })
      }
    }

    const groupableMedia = []
    const otherMedia = []

    for (const m of media) {
      switch (m.media_type) {
        case 'photo':
        case 'video':
          groupableMedia.push(m)
          break
        default:
          otherMedia.push(m)
          break
      }
    }

    for (const m of otherMedia) {
      switch (m.media_type) {
        case 'video_note':
          await ctx.replyWithVideoNote(m.file_id)
          break
        case 'voice':
          await ctx.replyWithVoice(m.file_id)
          break
        case 'audio':
          await ctx.replyWithAudio(m.file_id)
          break
      }
    }

    if (groupableMedia.length > 1) {
      const preparedMedia: (InputMediaPhoto | InputMediaVideo | InputMediaAudio)[] = groupableMedia.map((m) => {
        switch (m.media_type) {
          case 'photo':
            return { type: 'photo', media: m.file_id }
          case 'video':
            return { type: 'video', media: m.file_id }
          default:
            throw new Error(`Unsupported media type: ${m.media_type}`)
        }
      })
      const splicedPreparedMedia: (InputMediaPhoto | InputMediaVideo | InputMediaAudio)[][] = []
      for (let i = 0; i < preparedMedia.length; i++) {
        if (i % 10 === 0) {
          splicedPreparedMedia.push([])
        }
        splicedPreparedMedia[splicedPreparedMedia.length - 1].push(preparedMedia[i])
      }
      splicedPreparedMedia[splicedPreparedMedia.length - 1][0].caption = text
      for (const m of splicedPreparedMedia) {
        await ctx.replyWithMediaGroup(m)
      }
      return ctx.reply('Выберите дальнейшее действие', { reply_markup: keyboard })
    }
    else if (groupableMedia.length === 1) {
      const m = groupableMedia[0]
      switch (m.media_type) {
        case 'photo':
          return ctx.replyWithPhoto(m.file_id, { caption: text, reply_markup: keyboard })
        case 'video':
          return ctx.replyWithVideo(m.file_id, { caption: text, reply_markup: keyboard })
        case 'audio':
          return ctx.replyWithAudio(m.file_id, { caption: text, reply_markup: keyboard })
        default:
          throw new Error(`Unsupported media type: ${m.media_type}`)
      }
    }
    return ctx.reply(text, { reply_markup: keyboard })
  }
  // try {
  //   await ctx.editMe
  // } catch (e) {
  //   ctx.logger.error('Failed to remove media from message:', e)
  // }
  if (!!ctx.update.message?.text || !!ctx.update.callback_query?.message?.text) {
    return ctx.editMessageText(text || 'Выберите дальнейшее действие', { reply_markup: keyboard })
  }
  await ctx.editMessageReplyMarkup(undefined)
  return ctx.reply(text || 'Выберите дальнейшее действие', { reply_markup: keyboard })
}

export function answerWithMediaMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    ctx.answerWithMedia = (text: string, messageId: string, keyboard: InlineKeyboard) => answerWithMedia(ctx, text, messageId, keyboard)
    ctx.answerWithCase = (caze: Case, keyboard: InlineKeyboard) => answerWithMedia(ctx, caze.caption ?? '', caze, keyboard)
    await next()
  }
}
