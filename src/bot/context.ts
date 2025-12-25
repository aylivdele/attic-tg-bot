import type { Config } from '#root/config.js'
import type { Case } from '#root/database/queries.js'
import type { Logger } from '#root/logger.js'
import type { AutoChatActionFlavor } from '@grammyjs/auto-chat-action'
import type { HydrateFlavor } from '@grammyjs/hydrate'
import type { I18nFlavor } from '@grammyjs/i18n'
import type { ParseModeFlavor } from '@grammyjs/parse-mode'
import type { Context as DefaultContext, InlineKeyboard, SessionFlavor } from 'grammy'
import type { Database } from '../database/index.js'

export interface SessionData {
  // field?: string;
  lastCasesId: Record<string, number>
}

interface ExtendedContextFlavor {
  logger: Logger
  config: Config
  db: Database
  answerWithMedia: (text: string, messageId: string, keyboard: InlineKeyboard) => Promise<any>
  answerWithCase: (media: Case, keyboard: InlineKeyboard) => Promise<any>
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
