import { partnershipBootcampCallbackData, partnershipCasesCallbackData } from '#root/bot/callback-data/callbacks-partnership.js'
import { startMenuCallbackData } from '#root/bot/callback-data/callbacks-start.js'
import { directMessageCallbackData, shortDirectMessageCallbackData } from '#root/bot/callback-data/direct-message.js'
import { InlineKeyboard } from 'grammy'

export function mainPartnershipKeyboard() {
  return InlineKeyboard.from([
    [{ text: '🏆 Кейсы', callback_data: `cases|${partnershipCasesCallbackData}` }],
    [{ text: '💎 Попасть в команду', callback_data: partnershipBootcampCallbackData }],
    [{ text: '🚀 В начало', callback_data: startMenuCallbackData }],
    [{ text: '💬 Хочу пообщаться лично', callback_data: directMessageCallbackData }],
  ])
}

export function partnershipBootcampKeyboard(previousState: string, nextState?: string) {
  return InlineKeyboard.from([
    [{ text: nextState ? 'Далее' : '🚀 В меню', callback_data: nextState ?? startMenuCallbackData }],
    // [{ text: '↩ Назад', callback_data: previousState }],
    [{ text: '💬 Написать мне', callback_data: shortDirectMessageCallbackData }],
  ])
}
