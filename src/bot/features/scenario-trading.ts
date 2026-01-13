import type { Context } from '#root/bot/context.js'
import { scenarioTradingCallbackData, tradingBootcampCallbackData, tradingStatisticsCallbackData } from '#root/bot/callback-data/callbacks-trading.js'
import { mainTradingKeyboard, tradingBootcampKeyboard } from '#root/bot/keyboards/trading-keyboards.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature
  .callbackQuery(scenarioTradingCallbackData, async (ctx) => {
    ctx.notifyAdmin(`Пользователь смотрит про Trading Course: @${ctx.from.username}`)
    await ctx.answerCallbackQuery()
    ctx.updateUserState(scenarioTradingCallbackData)
    return ctx.answerWithMedia(scenarioTradingCallbackData, `🎯 TRADING COURSE - Это уже про самостоятельную торговлю на уровне профессии

3 модуля, 19 уроков:  
— как работать со входами, выходами, стопами и тейками;  
— как собирать свою торговую систему;  
— как управлять рисками и капиталом;  
— как убрать эмоции и торговать по стратегии.  
После курса наши пользователи начинают успешно <b>торговать сами</b>, а не просто повторять чужие сигналы.

Смотри прямо сейчас. <b>Через 24 часа доступ будет закрыт</b>`, { keyboard: mainTradingKeyboard(), parseMode: 'HTML' })
  })

feature
  .callbackQuery(tradingStatisticsCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
  })

const bootcamp1 = `${tradingBootcampCallbackData}1`
const bootcamp2 = `${tradingBootcampCallbackData}2`
const bootcamp3 = `${tradingBootcampCallbackData}3`
// const bootcamp4 = `${tradingBootcampCallbackData}4`

feature.callbackQuery(tradingBootcampCallbackData, async (ctx) => {
  ctx.notifyAdmin(`Пользователь заинтересовался покупкой Trading Course: @${ctx.from.username}`)

  await ctx.answerCallbackQuery()
  ctx.updateUserState(tradingBootcampCallbackData)
  return ctx.answerWithMedia(tradingBootcampCallbackData, `Чтобы получить доступ к школе по трейдингу и начать обучение, выполни несколько простых шагов 👇

1. Зарегистрируйся на бирже BingX по ссылке ниже:
https://bingx.com/partner/attic/`, { keyboard: tradingBootcampKeyboard(scenarioTradingCallbackData, bootcamp1), leaveLastMessage: ctx.session.userInfo?.previous_state === scenarioTradingCallbackData })
})

feature.callbackQuery(bootcamp1, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp1)
  return ctx.answerWithMedia(bootcamp1, `2. Зарегистрируйся на сайте ATTIC по моей ссылке:
https://atticalgo.com?promocode=${ctx.config.botAdminRefUrlCode}

<i>*Регистрация именно по этой ссылке откроет доступ к скидке на курсы и другие продукты компании</i>`, { parseMode: 'HTML', keyboard: tradingBootcampKeyboard(scenarioTradingCallbackData, bootcamp2), leaveLastMessage: true })
})

feature.callbackQuery(bootcamp2, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp2)
  return ctx.answerWithMedia(bootcamp2, `3. Открой раздел “Продукты” и выбери TRADING COURSE.

4. Перейди к оплате и активируй курс.

<b>*Если у тебя появляются сложности или нужна помощь, то пиши мне, я на связи</b>

<blockquote>Важный момент! Если ты первый раз скачал и зарегистрировал биржу BingX, то на ней есть правила, что при первой покупке криптовалюты в день регистрации, для твоей безопасности средства ограничиваются на 24 часа для вывода или оплаты

Что бы не терять время, ты можешь связаться со мной и я дам доступ к трем бесплатным урокам что бы ты уже мог углубляться в рынок крипты</blockquote>

<blockquote>Если у тебя уже была биржа BingX и ты просто вставил реф. код и перенес верификацию, то это на тебя не распространяется, ты можешь пользоваться криптой сразу</blockquote>`, { keyboard: tradingBootcampKeyboard(scenarioTradingCallbackData, bootcamp3), leaveLastMessage: true, parseMode: 'HTML' })
})

// feature.callbackQuery(bootcamp3, async (ctx) => {
//   await ctx.answerCallbackQuery()
//   ctx.updateUserState(bootcamp3)
//   return ctx.answerWithMedia(bootcamp3, `5. Зарегистрируйся на основной бирже BingX по ссылке ниже:
// https://bingx.com/partner/attic/`, { keyboard: tradingBootcampKeyboard(scenarioTradingCallbackData, bootcamp4), leaveLastMessage: true })
// })

feature.callbackQuery(bootcamp3, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp3)
  return ctx.answerWithMedia(bootcamp3, `5. В личном кабинете ATTIC зайди в “Настройки → Биржи” и добавь свой UID
(его можно найти в профиле BingX)

Готово! ✅

🖥️ После покупки тебе откроются модули и уроки полностью. Обучение проходит прямо в личном кабинете ATTIC, без сторонних платформ.

Если хочешь - <b>напиши мне лично, и я помогу пройти все шаги и быстрее втянуться в нишу.</b>`, { keyboard: tradingBootcampKeyboard(scenarioTradingCallbackData), leaveLastMessage: true, parseMode: 'HTML' })
})

export { composer as scenarioTradingFeature }
