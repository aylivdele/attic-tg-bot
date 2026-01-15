import type { Case } from '#root/database/queries.js'
import { deleteCaptionCallbackData, deleteCaseCallbackData, deleteMediaCallbackData, editCasesCallbackData, editCryptoSchoolCallbackData, editRobotsCallbackData, editSignalsCallbackData, editTradingCourseCallbackData, saveCaseCallbackData, viewCaseContentCallbackData } from '#root/bot/callback-data/cases-edit.js'
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
  if (newCase && (newCase.media_count > 0 || newCase.caption)) {
    const deleteButtons = []
    if (newCase.media_count > 0) {
      deleteButtons.push({ text: 'Удалить последнее медиа', callback_data: deleteMediaCallbackData })
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

export function createCaseKeyboard(casesSection: string, menuData: string, isAdmin?: boolean) {
  const keyboard = InlineKeyboard.from([
    [{ text: 'Следующий кейс', callback_data: casesSection }],
    [{ text: '↩ В меню', callback_data: menuData }],
  ])
  if (isAdmin) {
    keyboard.row().text('Удалить кейс', deleteCaseCallbackData)
  }
  return keyboard
}
