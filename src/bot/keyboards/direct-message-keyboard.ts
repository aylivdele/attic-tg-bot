import { startMenuCallbackData } from '#root/bot/callback-data/callbacks-start.js'
import { InlineKeyboard } from 'grammy'

export function directMessageKeyboard(adminUsername?: string) {
  return InlineKeyboard.from([
    [{ text: '🚀 В начало', callback_data: startMenuCallbackData }],
    [{ text: '✉ Написать мне', url: `tg://resolve?domain=${adminUsername}` }],
  ])
}

export function shortDirectMessageKeyboard(prevoius_state: string, adminUsername?: string) {
  return InlineKeyboard.from([
    [{ text: '↩️ Назад', callback_data: prevoius_state }],
    [{ text: '🚀 В начало', callback_data: startMenuCallbackData }],
    [{ text: '✉ Написать мне', url: `tg://resolve?domain=${adminUsername}` }],
  ])
}
