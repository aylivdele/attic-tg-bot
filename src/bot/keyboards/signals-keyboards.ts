import { scenarioSignalsCallbackData, signalsBootcampCallbackData, signalsCasesCallbackData, signalsStatisticsCallbackData } from '#root/bot/callback-data/callbacks-signals.js'
import { startMenuCallbackData } from '#root/bot/callback-data/callbacks-start.js'
import { directMessageCallbackData, shortDirectMessageCallbackData } from '#root/bot/callback-data/direct-message.js'
import { InlineKeyboard } from 'grammy'

export function mainSignalsKeyboard() {
  return InlineKeyboard.from([
    [{ text: '🔍 Посмотреть статистику', callback_data: signalsStatisticsCallbackData }],
    [{ text: '🏆 Кейсы', callback_data: `cases|${signalsCasesCallbackData}` }],
    [{ text: '💰 Купить сигналы', callback_data: signalsBootcampCallbackData }],
    [{ text: '🚀 В начало', callback_data: startMenuCallbackData }],
    [{ text: '💬 Хочу пообщаться лично', callback_data: directMessageCallbackData }],
  ])
}

export function signalsStatisticsKeyboard(_currentState: string) {
  const keyboard = InlineKeyboard.from([])
  keyboard.row().text('↩ Назад', scenarioSignalsCallbackData)
  return keyboard
}

export function signalsBootcampKeyboard(previousState: string, nextState?: string) {
  return InlineKeyboard.from([
    [{ text: nextState ? 'Далее' : '🚀 В меню', callback_data: nextState ?? startMenuCallbackData }],
    [{ text: '↩ Назад', callback_data: previousState }],
    [{ text: '💬 Написать мне', callback_data: shortDirectMessageCallbackData }],
  ])
}
