import { startMenuCallbackData } from '#root/bot/callback-data/callbacks-start.js'
import { InlineKeyboard } from 'grammy'

export function directMessageKeyboard() {
  return InlineKeyboard.from([
    [{ text: '🚀 В начало', callback_data: startMenuCallbackData }],
    [{ text: '✉ Написать мне', url: `tg://resolve?domain=BotFather` }],
  ])
}
