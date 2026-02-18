import type { Context, SessionData } from '#root/bot/context.js'

import type { Config } from '#root/config.js'
import type { Logger } from '#root/logger.js'
import type { BotConfig } from 'grammy'
import { casesFeature } from '#root/bot/features/cases-edit.js'
import { casesLoopFeature } from '#root/bot/features/cases-loop.js'
import { directMessageFeature } from '#root/bot/features/direct-message.js'
import { scenarioCryptoFeature } from '#root/bot/features/scenario-crypto.js'
import { scenarioPartnershipFeature } from '#root/bot/features/scenario-partnership.js'
import { scenarioRobotsFeature } from '#root/bot/features/scenario-robots.js'
import { scenarioSignalsFeature } from '#root/bot/features/scenario-signals.js'
import { scenarioTradingFeature } from '#root/bot/features/scenario-trading.js'
import { unhandledFeature } from '#root/bot/features/unhandled.js'
import { cameBackFeature } from '#root/bot/features/update-notification.js'
import { welcomeFeature } from '#root/bot/features/welcome.js'
import { errorHandler } from '#root/bot/handlers/error.js'
import { answerWithMediaMiddleware } from '#root/bot/middlewares/answer-with-media.js'
import { dbMiddleware } from '#root/bot/middlewares/db.js'
import { notificationsMiddleware } from '#root/bot/middlewares/notifications.js'
import { session } from '#root/bot/middlewares/session.js'
import { updateLogger } from '#root/bot/middlewares/update-logger.js'
import { query } from '#root/database/index.js'
import { autoChatAction } from '@grammyjs/auto-chat-action'
import { hydrate } from '@grammyjs/hydrate'
import { hydrateReply, parseMode } from '@grammyjs/parse-mode'
import { sequentialize } from '@grammyjs/runner'
import { MemorySessionStorage, Bot as TelegramBot } from 'grammy'
import { getBotId } from './helpers/botId.js'

interface Dependencies {
  config: Config
  logger: Logger
}

function getSessionKey(ctx: Omit<Context, 'session'>) {
  return ctx.chat?.id.toString()
}

export function createBot(token: string, dependencies: Dependencies, botConfig?: BotConfig<Context>) {
  const {
    config,
    logger,
  } = dependencies

  const bot = new TelegramBot<Context>(token, botConfig)

  bot.use(async (ctx, next) => {
    ctx.config = config
    ctx.logger = logger.child({
      update_id: ctx.update.update_id,
    })

    await next()
  })

  // attach database to context

  const protectedBot = bot.errorBoundary(errorHandler)

  // Middlewares
  bot.api.config.use(parseMode('HTML'))

  if (config.isPollingMode)
    protectedBot.use(sequentialize(getSessionKey))
  if (config.isDebug)
    protectedBot.use(updateLogger())
  protectedBot.use(autoChatAction(bot.api))
  protectedBot.use(hydrateReply)
  protectedBot.use(hydrate())
  protectedBot.use(session({
    getSessionKey,
    storage: new MemorySessionStorage<SessionData>(1000 * 60 * 60 * 24),
  }))
  // protectedBot.use(i18n)
  protectedBot.use(dbMiddleware())
  protectedBot.use(answerWithMediaMiddleware())
  protectedBot.use(notificationsMiddleware())

  // Handlers
  protectedBot.use(cameBackFeature)
  protectedBot.use(welcomeFeature)
  protectedBot.use(casesFeature)
  protectedBot.use(casesLoopFeature)
  protectedBot.use(directMessageFeature)
  protectedBot.use(scenarioRobotsFeature)
  protectedBot.use(scenarioSignalsFeature)
  protectedBot.use(scenarioCryptoFeature)
  protectedBot.use(scenarioTradingFeature)
  protectedBot.use(scenarioPartnershipFeature)

  // must be the last handler
  protectedBot.use(unhandledFeature)

  const _interval = setInterval(() => {
    const chatId = config.notificationChat
    if (chatId) {
      query('UPDATE users SET last_update = 0 WHERE bot_id = $1 and last_update <> 0 and last_update < $2 RETURNING username', [getBotId(), Date.now() - (1000 * 60 * 60 * 24)])
        .then((res) => {
          if (!res?.rows) {
            return
          }
          for (const row of res.rows) {
            bot.api.sendMessage(chatId, `Пользователь сутки не взаимодействовал в боте: @${row.username}`)
          }
        })
    }
  }, 1000 * 60 * 60)

  return bot
}

export type Bot = ReturnType<typeof createBot>
