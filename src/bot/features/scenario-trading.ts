import type { Context } from '#root/bot/context.js'
import { scenarioTradingCallbackData, tradingBootcampCallbackData, tradingStatisticsCallbackData } from '#root/bot/callback-data/callbacks-trading.js'
import { mainTradingKeyboard, tradingBootcampKeyboard } from '#root/bot/keyboards/trading-keyboards.js'
import { updateUserState } from '#root/database/queries.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature
  .callbackQuery(scenarioTradingCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
    await updateUserState(ctx.from.id, scenarioTradingCallbackData, ctx.db)
    return ctx.answerWithMedia(`🎯 TRADING COURSE - Это уже про самостоятельную торговлю на уровне профессии
3 модуля, 19 уроков:  
— как работать со входами, выходами, стопами и тейками;  
— как собирать свою торговую систему;  
— как управлять рисками и капиталом;  
— как убрать эмоции и торговать по стратегии.  
После курса человек может реально торговать сам, а не просто повторять чужие сигналы.

Смотри прямо сейчас. Через 24 часа доступ будет закрыт`, scenarioTradingCallbackData, mainTradingKeyboard())
  })

feature
  .callbackQuery(tradingStatisticsCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
  })

const bootcamp1 = `${tradingBootcampCallbackData}1`
const bootcamp2 = `${tradingBootcampCallbackData}2`
const bootcamp3 = `${tradingBootcampCallbackData}3`

feature.callbackQuery(tradingBootcampCallbackData, async (ctx) => {
  await ctx.answerCallbackQuery()
  await updateUserState(ctx.from.id, tradingBootcampCallbackData, ctx.db)
  return ctx.answerWithMedia(`Чтобы получить доступ к школе по трейдингу и начать обучение, выполни несколько простых шагов 👇

1. Зарегистрируйся на сайте ATTIC по моей ссылке:
https://atticalgo.com?promocode=DlAdyKE0SK

*Регистрация именно по этой ссылке откроет доступ к скидке на курсы и другие продукты компании`, tradingBootcampCallbackData, tradingBootcampKeyboard(scenarioTradingCallbackData, bootcamp1))
})

feature.callbackQuery(bootcamp1, async (ctx) => {
  await ctx.answerCallbackQuery()
  await updateUserState(ctx.from.id, bootcamp1, ctx.db)
  return ctx.answerWithMedia(`2. Войди в личный кабинет и открой раздел “Продукты → COURSES”.

3. Перейди к оплате и активируй курс.`, bootcamp1, tradingBootcampKeyboard(tradingBootcampCallbackData, bootcamp2))
})

feature.callbackQuery(bootcamp2, async (ctx) => {
  await ctx.answerCallbackQuery()
  await updateUserState(ctx.from.id, bootcamp2, ctx.db)
  return ctx.answerWithMedia(`4. Зарегистрируйся на бирже BingX по специальной ссылке:
https://bingx.com/partner/attic/`, bootcamp2, tradingBootcampKeyboard(bootcamp1, bootcamp3))
})

feature.callbackQuery(bootcamp3, async (ctx) => {
  await ctx.answerCallbackQuery()
  await updateUserState(ctx.from.id, bootcamp3, ctx.db)
  return ctx.answerWithMedia(`5. В личном кабинете ATTIC зайди в “Настройки → Биржи” и добавь свой UID
(его можно найти в профиле BingX)

Готово! ✅

🖥️ После покупки тебе откроются модули и уроки полностью. Обучение проходит прямо в личном кабинете ATTIC, без сторонних платформ.

Если хочешь - напиши мне лично, и я помогу пройти все шаги и быстрее втянуться в нишу.`, bootcamp3, tradingBootcampKeyboard(bootcamp2))
})

export { composer as scenarioTradingFeature }
