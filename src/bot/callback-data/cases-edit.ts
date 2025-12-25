import { cryptoCasesCallbackData } from '#root/bot/callback-data/callbacks-crypto.js'
import { robotsCasesCallbackData } from '#root/bot/callback-data/callbacks-robots.js'
import { signalsCasesCallbackData } from '#root/bot/callback-data/callbacks-signals.js'
import { tradingCasesCallbackData } from '#root/bot/callback-data/callbacks-trading.js'

export const editCasesCallbackData = 'edit_cases'
export const editRobotsCallbackData = 'cases_robots'
export const editSignalsCallbackData = 'cases_signals'
export const editCryptoSchoolCallbackData = 'cases_crypto_school'
export const editTradingCourseCallbackData = 'cases_trading_course'
export const saveCaseCallbackData = 'save_case'
export const deletePhotoCallbackData = 'delete_photo'
export const deleteVideonoteCallbackData = 'delete_videonote'
export const deleteAudionoteCallbackData = 'delete_audionote'
export const deleteVideoCallbackData = 'delete_video'
export const deleteAudioCallbackData = 'delete_audio'
export const deleteCaptionCallbackData = 'delete_caption'
export const viewCaseContentCallbackData = 'view_case_content'

export function getSectionName(callbackData: string) {
  switch (callbackData) {
    case editRobotsCallbackData:
      return 'Торговые роботы'
    case editSignalsCallbackData:
      return 'Сигналы'
    case editCryptoSchoolCallbackData:
      return 'Крипто-школа'
    case editTradingCourseCallbackData:
      return 'Трейдинг-курс'
  }
  throw new Error('Неизвестный раздел!')
}

export function mapEditCaseCallbackToLoopCallback(callbackData: string) {
  switch (callbackData) {
    case editRobotsCallbackData:
      return robotsCasesCallbackData
    case editSignalsCallbackData:
      return signalsCasesCallbackData
    case editCryptoSchoolCallbackData:
      return cryptoCasesCallbackData
    case editTradingCourseCallbackData:
      return tradingCasesCallbackData
    default:
      throw new Error('Неизвестный раздел!')
  }
}
