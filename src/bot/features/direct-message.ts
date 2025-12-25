import type { Context } from '#root/bot/context.js'
import { directMessageCallbackData } from '#root/bot/callback-data/direct-message.js'
import { directMessageKeyboard } from '#root/bot/keyboards/direct-message-keyboard.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

export { composer as directMessageFeature }

const feature = composer.chatType('private')

feature.callbackQuery(directMessageCallbackData, async (ctx) => {
  await ctx.answerCallbackQuery()
  return ctx.editMessageText('Личный диалог - лучший формат, чтобы быстро и продуктивно во всём разобраться и найти для себя лучшую стратегию для старта', { reply_markup: directMessageKeyboard() })
})
