import type { AnswerOptions } from '#root/bot/middlewares/answer-with-media.js'
import type { Config } from '#root/config.js'
import type { UserRecord } from '#root/database/queries.js'
import type { Logger } from '#root/logger.js'
import type { AutoChatActionFlavor } from '@grammyjs/auto-chat-action'
import type { HydrateFlavor } from '@grammyjs/hydrate'
import type { I18nFlavor } from '@grammyjs/i18n'
import type { ParseModeFlavor } from '@grammyjs/parse-mode'
import type { Context as DefaultContext, SessionFlavor } from 'grammy'
import type { Database } from '../database/index.js'

export interface SessionData {
  // field?: string;
  lastCasesId: Record<string, number>
  userInfo?: UserRecord
}

interface ExtendedContextFlavor {
  logger: Logger
  config: Config
  db: Database
  answerWithMedia: (messageId: string, text?: string | null, options?: AnswerOptions) => Promise<any>
  notifyAdmin: (text: string) => Promise<any>
  updateUserState: (newState: string) => void
}

export type Context = ParseModeFlavor<
  HydrateFlavor<
    DefaultContext &
    ExtendedContextFlavor &
    SessionFlavor<SessionData> &
    I18nFlavor &
    AutoChatActionFlavor
  >
>
