import type { Context } from '#root/bot/context.js'
import { scenarioRobotsCallbackData } from '#root/bot/callback-data/callbacks-robots.js'
import { directMessageCallbackData } from '#root/bot/callback-data/direct-message.js'
import { InlineKeyboard } from 'grammy'

export function createStartKeyboard(_ctx: Context) {
  return InlineKeyboard.from([
    [
      { text: 'Торговые роботы', callback_data: scenarioRobotsCallbackData },
    ],
    [
      { text: 'Сигналы', callback_data: 'course_signals' },
    ],
    [
      { text: 'Крипто-школа', callback_data: 'course_crypto' },
    ],
    [
      { text: 'Трейдинг-курс', callback_data: 'course_trading' },
    ],
    [
      { text: 'Партнерская сеть', callback_data: 'partnership' },
    ],
    [
      { text: 'Хочу пообщаться лично', callback_data: directMessageCallbackData },
    ],
  ])
}
