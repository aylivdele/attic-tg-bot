import type { Context } from '#root/bot/context.js'
import { startMenuCallbackData } from '#root/bot/callback-data/callbacks-start.js'
import { directMessageCallbackData, shortDirectMessageCallbackData } from '#root/bot/callback-data/direct-message.js'
import { directMessageKeyboard, shortDirectMessageKeyboard } from '#root/bot/keyboards/direct-message-keyboard.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

export { composer as directMessageFeature }

const feature = composer.chatType('private')

feature.callbackQuery(directMessageCallbackData, async (ctx) => {
  ctx.notifyAdmin(`Пользователь хочет связаться лично для разбора всех нюансов: @${ctx.from.username}`, ctx.from.username)
  ctx.updateUserState(directMessageCallbackData)
  await ctx.answerCallbackQuery()
  return ctx.answerWithMedia(directMessageCallbackData, `📞 Мой телеграмм: @${ctx.config.botAdminUsername}\n\nЛичный диалог - лучший формат, чтобы быстро и продуктивно во всём разобраться и найти для себя лучшую стратегию для старта`, { keyboard: directMessageKeyboard(ctx.config.botAdminUsername) })
})

feature.callbackQuery(shortDirectMessageCallbackData, async (ctx) => {
  ctx.notifyAdmin(`Пользователь хочет связаться лично для разбора всех нюансов: @${ctx.from.username}`, ctx.from.username)
  await ctx.answerCallbackQuery()
  ctx.updateUserState(shortDirectMessageCallbackData)
  return ctx.answerWithMedia(shortDirectMessageCallbackData, `📞 Мой телеграмм: @${ctx.config.botAdminUsername}`, { keyboard: shortDirectMessageKeyboard(ctx.session.userInfo?.previous_state ?? startMenuCallbackData, ctx.config.botAdminUsername) })
})
