import type { Context } from '#root/bot/context.js'
import { deleteCaptionCallbackData, deleteMediaCallbackData, editCasesCallbackData, editCryptoSchoolCallbackData, editPartnershipCourseCallbackData, editRobotsCallbackData, editSignalsCallbackData, editTradingCourseCallbackData, getSectionName, mapEditCaseCallbackToLoopCallback, saveCaseCallbackData, viewCaseContentCallbackData } from '#root/bot/callback-data/cases-edit.js'
import { createMainCasesKeyboard, createStartingCasesKeyboard } from '#root/bot/keyboards/cases-keyboard.js'
import { deleteLastUnsavedCaseMedia, deleteUnsavedCasesByUser, getUnsavedCaseByUser, insertNewCase, saveCaseByUser, updateCaseByUser } from '#root/database/queries.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

const startMessage = 'Чтобы добавить новый кейс, выберите раздел, в который планируете его добавить'

feature.hears('Шалом, бот бот', async (ctx) => {
  ctx.updateUserState(editCasesCallbackData)
  return ctx.reply(startMessage, { reply_markup: createStartingCasesKeyboard() })
})

feature.callbackQuery(editCasesCallbackData, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(editCasesCallbackData)
  return ctx.editMessageText(startMessage, { reply_markup: createStartingCasesKeyboard() })
})

feature.callbackQuery([editRobotsCallbackData, editSignalsCallbackData, editCryptoSchoolCallbackData, editTradingCourseCallbackData, editPartnershipCourseCallbackData], async (ctx) => {
  await ctx.answerCallbackQuery()
  await deleteUnsavedCasesByUser(ctx.from.id, ctx.db)
  await insertNewCase(mapEditCaseCallbackToLoopCallback(ctx.callbackQuery.data), ctx.from.id, ctx.db)
  ctx.updateUserState(editCasesCallbackData)
  const newCase = await getUnsavedCaseByUser(ctx.from.id, ctx.db)
  const sectionName = getSectionName(ctx.callbackQuery.data)
  const text = `<b>Выбранный раздел:</b> <i>${sectionName}</i>
→ Добавление нового кейса ←

— Отправьте медиафайлы/голосовые/кругляшки или сообщения, которые будут добавлены в кейс
❗<b>Отправляйте в порядке очереди, в которой они буду использованы ботом для отправки пользователю</b>

Все, что вы отправите в бота до того, пока не нажмете кнопку “Сохранить кейс” будет сохранено как один кейс.

— Отправляйте в бота необходимую информацию по кейсу, далее нажимайте “Сохранить кейс”, после чего добавляйте информацию по следующему кейсу из выбранного раздела или выберите другой раздел

— Если хотите сменить раздел добавления кейса, нажмите “Сменить раздел”`

  return ctx.editMessageText(text, { reply_markup: await createMainCasesKeyboard(newCase), parse_mode: 'HTML' })
})

feature.on(['message:text', 'message:video_note', 'message:voice', 'message:video', 'message:photo', 'message:audio'], async (ctx, next) => {
  const message = ctx.message
  const userState = ctx.session.userInfo
  if (userState && userState.current_state === editCasesCallbackData) {
    if (message.photo) {
      const fileId = message.photo[message.photo.length - 1].file_id
      await updateCaseByUser(ctx.from.id, 'photo', fileId, ctx.db)
    }
    else if (message.video_note) {
      const fileId = message.video_note.file_id
      await updateCaseByUser(ctx.from.id, 'videonote', fileId, ctx.db)
    }
    else if (message.voice) {
      const fileId = message.voice.file_id
      await updateCaseByUser(ctx.from.id, 'audionote', fileId, ctx.db)
    }
    else if (message.video) {
      const fileId = message.video.file_id
      await updateCaseByUser(ctx.from.id, 'video', fileId, ctx.db)
    }
    else if (message.audio) {
      const fileId = message.audio.file_id
      await updateCaseByUser(ctx.from.id, 'audio', fileId, ctx.db)
    }
    else if (message.text && message.text.length > 0) {
      const fileId = message.text
      await updateCaseByUser(ctx.from.id, 'caption', fileId, ctx.db)
    }

    const newCase = await getUnsavedCaseByUser(ctx.from.id, ctx.db)

    return ctx.reply(`✅ Сообщение добавлено в кейс!

— Если хотите добавить ещё что-то к этому кейсу, то просто отправьте следующее сообщение.
— Если хотите удалить любое содержимое, выберите в меню соответсвующее содержимое.
— Если хотите сохранить кейс и перейти к добавлению следующего кейса или перейти в другой раздел, то нажмите “Сохранить кейс”

— Для отмены добавления кейса, нажмите "Сменить раздел"`, { reply_markup: await createMainCasesKeyboard(newCase) })
  }

  next()
})

feature.callbackQuery([saveCaseCallbackData], async (ctx) => {
  await ctx.answerCallbackQuery()
  await saveCaseByUser(ctx.from.id, ctx.db)
  ctx.updateUserState(editCasesCallbackData)
  await ctx.editMessageText(`Кейс сохранён успешно!`, { reply_markup: { inline_keyboard: [] } })
  return ctx.reply(startMessage, { reply_markup: createStartingCasesKeyboard() })
})

feature.callbackQuery([deleteMediaCallbackData, deleteCaptionCallbackData], async (ctx) => {
  await ctx.answerCallbackQuery()
  if (ctx.callbackQuery.data === deleteMediaCallbackData) {
    await deleteLastUnsavedCaseMedia(ctx.from.id, ctx.db)
  }
  else if (ctx.callbackQuery.data === deleteCaptionCallbackData) {
    await updateCaseByUser(ctx.from.id, 'caption', null, ctx.db)
  }
  const newCase = await getUnsavedCaseByUser(ctx.from.id, ctx.db)
  return ctx.editMessageText(`Сообщение удалено из кейса.
      Если хотите удалить ещё что-то из этого кейса, выберите в меню соответсвующее содержимое.
      Если хотите сохранить кейс и перейти к добавлению следующего кейса или перейти в другой раздел, то нажмите “Сохранить кейс”
      Для отмены добавления кейса, нажмите "Сменить раздел"`, { reply_markup: await createMainCasesKeyboard(newCase) })
})

feature.callbackQuery(viewCaseContentCallbackData, async (ctx) => {
  const newCase = await getUnsavedCaseByUser(ctx.from.id, ctx.db)
  if (!newCase) {
    return ctx.answerCallbackQuery({ show_alert: true, text: 'Нет несохранённого кейса' })
  }
  await ctx.answerCallbackQuery()
  await ctx.answerWithMedia(newCase.id.toString(), newCase.caption)
  await ctx.reply('Выберите дальнейшее действие', { reply_markup: await createMainCasesKeyboard(newCase) })
})

export { composer as casesFeature }
