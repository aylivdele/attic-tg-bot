import type { Context } from '#root/bot/context.js'
import { deleteAudioCallbackData, deleteAudionoteCallbackData, deleteCaptionCallbackData, deletePhotoCallbackData, deleteVideoCallbackData, deleteVideonoteCallbackData, editCasesCallbackData, editCryptoSchoolCallbackData, editRobotsCallbackData, editSignalsCallbackData, editTradingCourseCallbackData, getSectionName, mapEditCaseCallbackToLoopCallback, saveCaseCallbackData, viewCaseContentCallbackData } from '#root/bot/callback-data/cases-edit.js'
import { createMainCasesKeyboard, createStartingCasesKeyboard } from '#root/bot/keyboards/cases-keyboard.js'
import { deleteUnsavedCasesByUser, getUnsavedCaseByUser, getUserStates, insertNewCase, saveCaseByUser, updateCaseByUser, updateUserState } from '#root/database/queries.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

const startMessage = 'Чтобы добавить новый кейс, выберите раздел, в который планируете его добавить'

feature.hears('Шалом, бот бот', async (ctx) => {
  return updateUserState(ctx.from.id, editCasesCallbackData, ctx.db).then(() => ctx.reply(startMessage, { reply_markup: createStartingCasesKeyboard() }))
})

feature.callbackQuery(editCasesCallbackData, async (ctx) => {
  await ctx.answerCallbackQuery()
  await deleteUnsavedCasesByUser(ctx.from.id, ctx.db)
  await updateUserState(ctx.from.id, editCasesCallbackData, ctx.db)
  return ctx.editMessageText(startMessage, { reply_markup: createStartingCasesKeyboard() })
})

feature.callbackQuery([editRobotsCallbackData, editSignalsCallbackData, editCryptoSchoolCallbackData, editTradingCourseCallbackData], async (ctx) => {
  await ctx.answerCallbackQuery()
  await insertNewCase(mapEditCaseCallbackToLoopCallback(ctx.callbackQuery.data), ctx.from.id, ctx.db)
  await updateUserState(ctx.from.id, editCasesCallbackData, ctx.db)
  const newCase = await getUnsavedCaseByUser(ctx.from.id, ctx.db)
  return ctx.editMessageText(`Выбранный раздел: ${getSectionName(ctx.callbackQuery.data)}
Добавление нового кейса

Отправьте медиафайлы/голосовые/кругляшки или сообщения, которые будут добавлены в кейс. Отправляйте в порядке очереди, в которой они буду использованы ботом для отправки пользователю
Все, что вы отправите в бота до того, пока не нажмете кнопку “Сохранить кейс” будет сохранено как один кейс.

Отправляйте в бота необходимую информацию по кейсу, далее нажимайте “Сохранить кейс”, после чего добавляйте информацию по следующему кейсу из выбранного раздела или выберите другой раздел

Если хотите сменить раздел добавления кейса, нажмите “Сменить раздел”`, { reply_markup: await createMainCasesKeyboard(newCase) })
})

feature.on(['message:text', 'message:video_note', 'message:voice', 'message:video', 'message:photo', 'message:audio'], async (ctx, next) => {
  const message = ctx.message
  const userState = await getUserStates(ctx.from.id, ctx.db)
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

    return ctx.reply(`Сообщение добавлено в кейс.
      Если хотите добавить ещё что-то к этому кейсу, то просто отправьте следующее сообщение.
      Если хотите удалить любое содержимое, выберите в меню соответсвующее содержимое.
      Если хотите сохранить кейс и перейти к добавлению следующего кейса или перейти в другой раздел, то нажмите “Сохранить кейс”
      Для отмены добавления кейса, нажмите "Сменить раздел"`, { reply_markup: await createMainCasesKeyboard(newCase) })
  }

  next()
})

feature.callbackQuery([saveCaseCallbackData], async (ctx) => {
  await ctx.answerCallbackQuery()
  await saveCaseByUser(ctx.from.id, ctx.db)
  await updateUserState(ctx.from.id, editCasesCallbackData, ctx.db)
  await ctx.editMessageText(`Кейс сохранён успешно!`, { reply_markup: { inline_keyboard: [] } })
  return ctx.reply(startMessage, { reply_markup: createStartingCasesKeyboard() })
})

feature.callbackQuery([deleteAudioCallbackData, deleteAudionoteCallbackData, deletePhotoCallbackData, deleteVideonoteCallbackData, deleteVideoCallbackData, deleteCaptionCallbackData], async (ctx) => {
  await ctx.answerCallbackQuery()
  if (ctx.callbackQuery.data === deleteAudioCallbackData) {
    await updateCaseByUser(ctx.from.id, 'audio', null, ctx.db)
  }
  else if (ctx.callbackQuery.data === deletePhotoCallbackData) {
    await updateCaseByUser(ctx.from.id, 'photo', null, ctx.db)
  }
  else if (ctx.callbackQuery.data === deleteVideonoteCallbackData) {
    await updateCaseByUser(ctx.from.id, 'videonote', null, ctx.db)
  }
  else if (ctx.callbackQuery.data === deleteVideoCallbackData) {
    await updateCaseByUser(ctx.from.id, 'video', null, ctx.db)
  }
  else if (ctx.callbackQuery.data === deleteCaptionCallbackData) {
    await updateCaseByUser(ctx.from.id, 'caption', null, ctx.db)
  }
  else if (ctx.callbackQuery.data === deleteAudionoteCallbackData) {
    await updateCaseByUser(ctx.from.id, 'audionote', null, ctx.db)
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
  if (newCase.videonote) {
    await ctx.replyWithVideoNote(newCase.videonote)
  }
  if (newCase.audionote) {
    await ctx.replyWithVoice(newCase.audionote)
  }
  if (newCase.audio) {
    await ctx.replyWithAudio(newCase.audio)
  }
  if (newCase.photo && newCase.video) {
    await ctx.replyWithMediaGroup([
      { type: 'photo', media: newCase.photo, caption: newCase.caption ?? undefined },
      { type: 'video', media: newCase.video },
    ])
  }
  else if (newCase.photo) {
    await ctx.replyWithPhoto(newCase.photo, { caption: newCase.caption ?? undefined })
  }
  else if (newCase.video) {
    await ctx.replyWithVideo(newCase.video, { caption: newCase.caption ?? undefined })
  }
  else if (newCase.caption) {
    await ctx.reply(newCase.caption)
  }
})

export { composer as casesFeature }
