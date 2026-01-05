import type { Context } from '#root/bot/context.js'
import type { InlineKeyboard, Middleware } from 'grammy'
import type { InputMediaPhoto, InputMediaVideo, LinkPreviewOptions, MessageEntity, ParseMode } from 'grammy/types'
import { shortDirectMessageCallbackData } from '#root/bot/callback-data/direct-message.js'
import { getMediaForMessage } from '#root/database/queries.js'

export interface AnswerOptions {
  keyboard?: InlineKeyboard
  leaveLastMessage?: boolean
  entities?: MessageEntity[]
  linkPreviewOptions?: LinkPreviewOptions
  parseMode?: ParseMode
}

const chooseNextStepMessage = 'Выберите дальнейшее действие'

async function answerWithMedia(ctx: Context, messageId: string, text?: string | null, options?: AnswerOptions) {
  const { keyboard, entities, parseMode, linkPreviewOptions = { is_disabled: true } } = options ?? {}
  if (ctx.session.userInfo?.previous_state === shortDirectMessageCallbackData && ctx.session.userInfo.current_state?.includes('bootcamp')) {
    return ctx.editMessageText(chooseNextStepMessage, { reply_markup: keyboard })
  }
  const media = await getMediaForMessage(messageId, ctx.db)
  text = text || undefined
  if (media && media.length > 0) {
    try {
      if (ctx.update.callback_query) {
        await ctx.editMessageReplyMarkup(undefined)
      }
    }
    catch (e) {
      ctx.logger.error('Failed to remove inline keyboard:', e)
    }

    let skipPhotoVideo = false
    let skipText = false

    for (let i = 0; i < media.length; i++) {
      const cur = media[i]
      if (['video', 'photo'].includes(cur.media_type)) {
        if (!skipPhotoVideo) {
          const preparedMedia: (InputMediaPhoto | InputMediaVideo)[] = media.filter(m => ['video', 'photo'].includes(m.media_type)).map(m => ({ type: m.media_type === 'video' ? 'video' : 'photo', media: m.file_id }))
          const splicedArrays: ((InputMediaPhoto | InputMediaVideo)[])[] = []
          for (let i = 0; i < preparedMedia.length; i++) {
            if (i % 10 === 0) {
              splicedArrays.push([])
            }
            splicedArrays[splicedArrays.length - 1].push(preparedMedia[i])
          }
          if (splicedArrays.length > 0) {
            splicedArrays[splicedArrays.length - 1][0].caption = text
            splicedArrays[splicedArrays.length - 1][0].parse_mode = parseMode
            splicedArrays[splicedArrays.length - 1][0].caption_entities = entities
            skipText = true
          }
          skipPhotoVideo = true
          for (const subArr of splicedArrays) {
            await ctx.replyWithMediaGroup(subArr)
          }
        }
      }

      switch (cur.media_type) {
        case 'videonote':
          await ctx.replyWithVideoNote(cur.file_id)
          break
        case 'audionote':
          await ctx.replyWithAudio(cur.file_id)
          break
        case 'voice':
          await ctx.replyWithVoice(cur.file_id)
          break
      }
    }

    return ctx.reply((!skipText && !!text) ? text : chooseNextStepMessage, { reply_markup: keyboard, entities, link_preview_options: linkPreviewOptions, parse_mode: parseMode })

    //   if (media.length === 1) {
    //     const m = media[0]
    //   }

    //   const groupableMedia = []
    //   const otherMedia = []

    //   for (const m of media) {
    //     switch (m.media_type) {
    //       case 'photo':
    //       case 'video':
    //         groupableMedia.push(m)
    //         break
    //       default:
    //         otherMedia.push(m)
    //         break
    //     }
    //   }

    //   for (const m of otherMedia) {
    //     switch (m.media_type) {
    //       case 'video_note':
    //         await ctx.replyWithVideoNote(m.file_id)
    //         break
    //       case 'voice':
    //         await ctx.replyWithVoice(m.file_id)
    //         break
    //       case 'audio':
    //         await ctx.replyWithAudio(m.file_id)
    //         break
    //     }
    //   }

  //   if (groupableMedia.length > 1) {
  //     const preparedMedia: (InputMediaPhoto | InputMediaVideo | InputMediaAudio)[] = groupableMedia.map((m) => {
  //       switch (m.media_type) {
  //         case 'photo':
  //           return { type: 'photo', media: m.file_id }
  //         case 'video':
  //           return { type: 'video', media: m.file_id }
  //         default:
  //           throw new Error(`Unsupported media type: ${m.media_type}`)
  //       }
  //     })
  //     const splicedPreparedMedia: (InputMediaPhoto | InputMediaVideo | InputMediaAudio)[][] = []
  //     for (let i = 0; i < preparedMedia.length; i++) {
  //       if (i % 10 === 0) {
  //         splicedPreparedMedia.push([])
  //       }
  //       splicedPreparedMedia[splicedPreparedMedia.length - 1].push(preparedMedia[i])
  //     }
  //     splicedPreparedMedia[splicedPreparedMedia.length - 1][0].caption = text
  //     for (const m of splicedPreparedMedia) {
  //       await ctx.replyWithMediaGroup(m)
  //     }
  //     return ctx.reply(chooseNextStepMessage, { reply_markup: keyboard })
  //   }
  //   else if (groupableMedia.length === 1) {
  //     const m = groupableMedia[0]
  //     switch (m.media_type) {
  //       case 'photo':
  //         return ctx.replyWithPhoto(m.file_id, { caption: text, reply_markup: keyboard })
  //       case 'video':
  //         return ctx.replyWithVideo(m.file_id, { caption: text, reply_markup: keyboard })
  //       case 'audio':
  //         return ctx.replyWithAudio(m.file_id, { caption: text, reply_markup: keyboard })
  //       default:
  //         throw new Error(`Unsupported media type: ${m.media_type}`)
  //     }
  //   }
  //   return ctx.reply(text, { reply_markup: keyboard })
  // }
  // try {
  //   await ctx.editMe
  // } catch (e) {
  //   ctx.logger.error('Failed to remove media from message:', e)
  // }
  }

  let leaveLastMessage = options?.leaveLastMessage
  if (ctx.update.callback_query?.message?.video) {
    leaveLastMessage = true
  }
  else if (ctx.update.callback_query?.message?.text === chooseNextStepMessage) {
    leaveLastMessage = false
  }
  else if (ctx.session.userInfo?.previous_state?.includes('bootcamp')) {
    leaveLastMessage = true
  }
  if (!!ctx.update.callback_query?.message?.text && !leaveLastMessage) {
    return ctx.editMessageText(text || chooseNextStepMessage, { reply_markup: keyboard, entities, link_preview_options: linkPreviewOptions, parse_mode: parseMode })
  }
  if (ctx.update.callback_query) {
    await ctx.editMessageReplyMarkup(undefined)
  }
  return ctx.reply(text || chooseNextStepMessage, { reply_markup: keyboard, entities, link_preview_options: linkPreviewOptions, parse_mode: parseMode })
}

export function answerWithMediaMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    ctx.answerWithMedia = (messageId: string, text?: string | null, options?: AnswerOptions) => answerWithMedia(ctx, messageId, text, options)
    await next()
  }
}
