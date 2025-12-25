import type { Context } from '#root/bot/context.js'
import { startMenuCallbackData } from '#root/bot/callback-data/callbacks-start.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { createCaseKeyboard } from '#root/bot/keyboards/cases-keyboard.js'
import { getNextCase, getUserStates, updateUserState } from '#root/database/queries.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

export { composer as casesLoopFeature }

const feature = composer.chatType('private')

feature.callbackQuery(/^cases\|/, logHandle('cases-loop'), async (ctx) => {
  ctx.answerCallbackQuery()
  await updateUserState(ctx.from.id, ctx.callbackQuery.data, ctx.db)
  const parts = ctx.callbackQuery.data.split('|')
  const section = parts[1]
  const lastCaseId = ctx.session.lastCasesId?.[section]
  const nextCase = await getNextCase(ctx.db, section, lastCaseId)
  const previousState = (await getUserStates(ctx.from.id, ctx.db))?.previous_state ?? startMenuCallbackData

  if (nextCase) {
    ctx.session.lastCasesId = ctx.session.lastCasesId || {}
    ctx.session.lastCasesId[section] = nextCase.id
    await ctx.answerWithCase(nextCase, createCaseKeyboard(ctx.callbackQuery.data, previousState))
  }
})
