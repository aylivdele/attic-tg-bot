import { robotsBootcampCallbackData, robotsCasesCallbackData, robotsStatisticsCallbackData, scenarioRobotsCallbackData, statisticsAIDescription, statisticsMDescription, statisticsRDescription } from '#root/bot/callback-data/callbacks-robots.js'
import { startMenuCallbackData } from '#root/bot/callback-data/callbacks-start.js'
import { directMessageCallbackData, shortDirectMessageCallbackData } from '#root/bot/callback-data/direct-message.js'
import { InlineKeyboard } from 'grammy'

export function mainRobotsKeyboard() {
  return InlineKeyboard.from([
    [{ text: '🔍Статистика роботов', callback_data: robotsStatisticsCallbackData }],
    [{ text: '🏆 Кейсы', callback_data: `cases|${robotsCasesCallbackData}` }],
    [{ text: '🤖 Хочу подключить роботов', callback_data: robotsBootcampCallbackData }],
    [{ text: '🚀 В начало', callback_data: startMenuCallbackData }],
    [{ text: '💬 Хочу пообщаться лично', callback_data: directMessageCallbackData }],
  ])
}

export function robotsStatisticsKeyboard(currentState: string) {
  const keyboard = InlineKeyboard.from([])

  if (currentState !== 'statistics_r') {
    keyboard.row().text('Подробнее про ATTIC - R', statisticsRDescription)
  }

  if (currentState !== 'statistics_ai') {
    keyboard.row().text('Подробнее про ATTIC - Ai', statisticsAIDescription)
  }

  if (currentState !== 'statistics_m') {
    keyboard.row().text('Подробнее про ATTIC - M', statisticsMDescription)
  }

  keyboard.row().text('↩ Назад', scenarioRobotsCallbackData)

  return keyboard
}

export function robotsBootcampKeyboard(previousState: string, nextState?: string) {
  return InlineKeyboard.from([
    [{ text: nextState ? 'Далее' : '🚀 В меню', callback_data: nextState ?? startMenuCallbackData }],
    // [{ text: '↩ Назад', callback_data: previousState }],
    [{ text: '💬 Написать мне', callback_data: shortDirectMessageCallbackData }],
  ])
}
