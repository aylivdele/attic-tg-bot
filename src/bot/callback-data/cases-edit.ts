import { cryptoCasesCallbackData } from '#root/bot/callback-data/callbacks-crypto.js'
import { partnershipCasesCallbackData } from '#root/bot/callback-data/callbacks-partnership.js'
import { robotsCasesCallbackData } from '#root/bot/callback-data/callbacks-robots.js'
import { signalsCasesCallbackData } from '#root/bot/callback-data/callbacks-signals.js'
import { tradingCasesCallbackData } from '#root/bot/callback-data/callbacks-trading.js'

export const editCasesCallbackData = 'edit_cases'
export const editRobotsCallbackData = 'cases_robots'
export const editSignalsCallbackData = 'cases_signals'
export const editCryptoSchoolCallbackData = 'cases_crypto_school'
export const editTradingCourseCallbackData = 'cases_trading_course'
export const editPartnershipCourseCallbackData = 'cases_partnership_course'
export const saveCaseCallbackData = 'save_case'
export const deleteCaptionCallbackData = 'delete_caption'
export const deleteMediaCallbackData = 'delete_media'
export const viewCaseContentCallbackData = 'view_case_content'
export const deleteCaseCallbackData = 'delete_case'

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
    case editPartnershipCourseCallbackData:
      return 'Партнерская сеть'
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
    case editPartnershipCourseCallbackData:
      return partnershipCasesCallbackData
    default:
      throw new Error('Неизвестный раздел!')
  }
}
