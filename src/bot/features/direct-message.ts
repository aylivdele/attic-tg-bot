import type { Context } from '#root/bot/context.js'
import { directMessageCallbackData, shortDirectMessageCallbackData } from '#root/bot/callback-data/direct-message.js'
import { directMessageKeyboard } from '#root/bot/keyboards/direct-message-keyboard.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

export { composer as directMessageFeature }

const feature = composer.chatType('private')

feature.callbackQuery(directMessageCallbackData, async (ctx) => {
  ctx.notifyAdmin(`Пользователь хочет связаться лично для разбора всех нюансов: @${ctx.from.username}`)
  await ctx.answerCallbackQuery()
  return ctx.editMessageText('Личный диалог - лучший формат, чтобы быстро и продуктивно во всём разобраться и найти для себя лучшую стратегию для старта', { reply_markup: directMessageKeyboard() })
})

feature.callbackQuery(shortDirectMessageCallbackData, async (ctx) => {
  ctx.notifyAdmin(`Пользователь хочет связаться лично для разбора всех нюансов: @${ctx.from.username}`)
  return await ctx.answerCallbackQuery()
})
