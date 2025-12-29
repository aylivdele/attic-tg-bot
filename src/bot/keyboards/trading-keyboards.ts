import { startMenuCallbackData } from '#root/bot/callback-data/callbacks-start.js'
import { tradingBootcampCallbackData, tradingCasesCallbackData, tradingStatisticsCallbackData } from '#root/bot/callback-data/callbacks-trading.js'
import { directMessageCallbackData, shortDirectMessageCallbackData } from '#root/bot/callback-data/direct-message.js'
import { InlineKeyboard } from 'grammy'

export function mainTradingKeyboard() {
  return InlineKeyboard.from([
    [{ text: '📙 Cодержание курса', callback_data: tradingStatisticsCallbackData, url: 'https://atticalgo.com/app/learning/trading?promocode=DlAdyKE0SK' }],
    [{ text: '🏆 Кейсы', callback_data: `cases|${tradingCasesCallbackData}` }],
    [{ text: '💳 Купить курс', callback_data: tradingBootcampCallbackData }],
    [{ text: '🚀 В начало', callback_data: startMenuCallbackData }],
    [{ text: '💬 Хочу пообщаться лично', callback_data: directMessageCallbackData }],
  ])
}

export function tradingBootcampKeyboard(previousState: string, nextState?: string) {
  return InlineKeyboard.from([
    [{ text: nextState ? 'Далее' : '🚀 В меню', callback_data: nextState ?? startMenuCallbackData }],
    [{ text: '↩ Назад', callback_data: previousState }],
    [{ text: '💬 Написать мне', callback_data: shortDirectMessageCallbackData }],
  ])
}
