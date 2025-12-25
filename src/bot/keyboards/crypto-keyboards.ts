import { cryptoBootcampCallbackData, cryptoCasesCallbackData, cryptoSummaryCallbackData, scenarioCryptoCallbackData } from '#root/bot/callback-data/callbacks-crypto.js'
import { startMenuCallbackData } from '#root/bot/callback-data/callbacks-start.js'
import { directMessageCallbackData, shortDirectMessageCallbackData } from '#root/bot/callback-data/direct-message.js'
import { InlineKeyboard } from 'grammy'

export function mainCryptoKeyboard() {
  return InlineKeyboard.from([
    [{ text: '📘 Содержание курса', callback_data: cryptoSummaryCallbackData, url: 'https://atticalgo.com/app/learning/crypto?promocode=DlAdyKE0SK' }],
    [{ text: '🏆 Кейсы', callback_data: `cases|${cryptoCasesCallbackData}` }],
    [{ text: '💳 Купить курс', callback_data: cryptoBootcampCallbackData }],
    [{ text: '🚀 В начало', callback_data: startMenuCallbackData }],
    [{ text: '💬 Хочу пообщаться лично', callback_data: directMessageCallbackData }],
  ])
}

export function cryptoStatisticsKeyboard(_currentState: string) {
  const keyboard = InlineKeyboard.from([])
  keyboard.row().text('↩ Назад', scenarioCryptoCallbackData)
  return keyboard
}

export function cryptoBootcampKeyboard(previousState: string, nextState?: string) {
  return InlineKeyboard.from([
    [{ text: nextState ? 'Далее' : '🚀 В меню', callback_data: nextState ?? startMenuCallbackData }],
    [{ text: '↩ Назад', callback_data: previousState }],
    [{ text: '💬 Написать мне', callback_data: shortDirectMessageCallbackData, url: `tg://resolve?domain=BotFather` }],
  ])
}
