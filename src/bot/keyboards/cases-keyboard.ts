import type { Case } from '#root/database/queries.js'
import { deleteAudioCallbackData, deleteAudionoteCallbackData, deleteCaptionCallbackData, deletePhotoCallbackData, deleteVideoCallbackData, deleteVideonoteCallbackData, editCasesCallbackData, editCryptoSchoolCallbackData, editRobotsCallbackData, editSignalsCallbackData, editTradingCourseCallbackData, saveCaseCallbackData, viewCaseContentCallbackData } from '#root/bot/callback-data/cases-edit.js'
import { InlineKeyboard } from 'grammy'

export function createStartingCasesKeyboard() {
  return InlineKeyboard.from([
    [{ text: 'Торговые роботы', callback_data: editRobotsCallbackData }],
    [{ text: 'Сигналы', callback_data: editSignalsCallbackData }],
    [{ text: 'Крипто-школа', callback_data: editCryptoSchoolCallbackData }],
    [{ text: 'Трейдинг-курс', callback_data: editTradingCourseCallbackData }],
  ])
}

export async function createMainCasesKeyboard(newCase?: Case | null) {
  if (newCase && (newCase.photo || newCase.videonote || newCase.audionote || newCase.video || newCase.audio || newCase.caption)) {
    const deleteButtons = []
    if (newCase.photo) {
      deleteButtons.push({ text: 'Удалить фото', callback_data: deletePhotoCallbackData })
    }
    if (newCase.videonote) {
      deleteButtons.push({ text: 'Удалить кругляш', callback_data: deleteVideonoteCallbackData })
    }
    if (newCase.audionote) {
      deleteButtons.push({ text: 'Удалить голосовое', callback_data: deleteAudionoteCallbackData })
    }
    if (newCase.video) {
      deleteButtons.push({ text: 'Удалить видео', callback_data: deleteVideoCallbackData })
    }
    if (newCase.audio) {
      deleteButtons.push({ text: 'Удалить аудио', callback_data: deleteAudioCallbackData })
    }
    if (newCase.caption) {
      deleteButtons.push({ text: 'Удалить текст', callback_data: deleteCaptionCallbackData })
    }
    return InlineKeyboard.from([
      ...deleteButtons.map(button => [button]),
      [{ text: 'Посмотреть содержимое', callback_data: viewCaseContentCallbackData }],
      [{ text: 'Сохранить кейс', callback_data: saveCaseCallbackData }],
      [{ text: 'Сменить раздел', callback_data: editCasesCallbackData }],
    ])
  }
  return InlineKeyboard.from([
    [{ text: 'Сменить раздел', callback_data: editCasesCallbackData }],
  ])
}

export function createCaseKeyboard(casesSection: string, menuData: string) {
  return InlineKeyboard.from([
    [{ text: 'Следующий кейс', callback_data: casesSection }],
    [{ text: '↩ В меню', callback_data: menuData }],
  ])
}
