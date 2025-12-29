import type { Context } from '#root/bot/context.js'
import { scenarioCryptoCallbackData } from '#root/bot/callback-data/callbacks-crypto.js'
import { scenarioPartnershipCallbackData } from '#root/bot/callback-data/callbacks-partnership.js'
import { scenarioRobotsCallbackData } from '#root/bot/callback-data/callbacks-robots.js'
import { scenarioSignalsCallbackData } from '#root/bot/callback-data/callbacks-signals.js'
import { scenarioTradingCallbackData } from '#root/bot/callback-data/callbacks-trading.js'
import { directMessageCallbackData } from '#root/bot/callback-data/direct-message.js'
import { InlineKeyboard } from 'grammy'

export function createStartKeyboard(_ctx: Context) {
  return InlineKeyboard.from([
    [
      { text: '🟢Торговые роботы', callback_data: scenarioRobotsCallbackData },
    ],
    [
      { text: '📈Сигналы', callback_data: scenarioSignalsCallbackData },
    ],
    [
      { text: '🎓Крипто-школа', callback_data: scenarioCryptoCallbackData },
    ],
    [
      { text: '🎓Трейдинг-курс', callback_data: scenarioTradingCallbackData },
    ],
    [
      { text: '🤝Партнерская сеть', callback_data: scenarioPartnershipCallbackData },
    ],
    [
      { text: '💬Хочу пообщаться лично', callback_data: directMessageCallbackData },
    ],
  ])
}
