import type { Context } from '#root/bot/context.js'
import { startMenuCallbackData } from '#root/bot/callback-data/callbacks-start.js'
import { deleteCaseCallbackData } from '#root/bot/callback-data/cases-edit.js'
import { isAdmin } from '#root/bot/filters/is-admin.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { createCaseKeyboard } from '#root/bot/keyboards/cases-keyboard.js'
import { deleteCaseAndMediaByCaseId, getNextCase } from '#root/database/queries.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

export { composer as casesLoopFeature }

const feature = composer.chatType('private')

feature.callbackQuery(/^cases\|/, logHandle('cases-loop'), async (ctx) => {
  ctx.answerCallbackQuery()
  ctx.updateUserState(ctx.callbackQuery.data)
  const parts = ctx.callbackQuery.data.split('|')
  const section = parts[1]
  const lastCaseId = ctx.session.lastCasesId?.[section]
  const nextCase = await getNextCase(ctx.db, section, lastCaseId)
  const previousState = ctx.session.userInfo?.previous_state ?? startMenuCallbackData

  if (nextCase) {
    ctx.session.lastCasesId = ctx.session.lastCasesId || {}
    ctx.session.lastCasesId[section] = nextCase.id
    await ctx.answerWithMedia(nextCase.id.toString(), nextCase.caption, { keyboard: createCaseKeyboard(ctx.callbackQuery.data, previousState, isAdmin(ctx)), leaveLastMessage: true })
  }
})

feature.callbackQuery(deleteCaseCallbackData, async (ctx) => {
  if (!isAdmin) {
    return ctx.answerCallbackQuery('Недостаточно прав!')
  }
  ctx.answerCallbackQuery()
  const state = ctx.session.userInfo?.current_state ?? startMenuCallbackData
  const previousState = ctx.session.userInfo?.previous_state ?? startMenuCallbackData

  const parts = state.split('|')
  const section = parts[1]
  const lastCaseId = ctx.session.lastCasesId?.[section]
  if (lastCaseId !== null && lastCaseId !== undefined) {
    return await deleteCaseAndMediaByCaseId(lastCaseId, ctx.db).then(
      () => ctx.answerWithMedia('', 'Кейс успешно удален', { keyboard: createCaseKeyboard(state, previousState), leaveLastMessage: true }),
      (reason) => {
        ctx.logger.error(reason)
        return ctx.answerWithMedia('', 'Ошибка при удалении кейса', { keyboard: createCaseKeyboard(state, previousState), leaveLastMessage: true })
      },
    )
  }
  return ctx.answerWithMedia('', 'Кейс не найден', { keyboard: createCaseKeyboard(state, previousState), leaveLastMessage: true })
})
