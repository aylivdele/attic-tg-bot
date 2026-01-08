import type { Context } from '#root/bot/context.js'
import { cryptoBootcampCallbackData, cryptoSummaryCallbackData, scenarioCryptoCallbackData } from '#root/bot/callback-data/callbacks-crypto.js'
import { cryptoBootcampKeyboard, mainCryptoKeyboard } from '#root/bot/keyboards/crypto-keyboards.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature
  .callbackQuery(scenarioCryptoCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
    ctx.updateUserState(scenarioCryptoCallbackData)
    return ctx.answerWithMedia(scenarioCryptoCallbackData, `🎓 CRYPTO COURSE - Это база по крипторынку
6 модулей, 18 уроков:  
— как устроены биржи и инструменты;  
— как безопасно хранить средства;  
— как открывать первые сделки без ошибок;  
— как избежать типичных сливов новичков.  
Курс делает так, что тема крипты перестаёт быть «страшной» и становится понятной.

Смотри прямо сейчас. <b>Через 24 часа доступ будет закрыт</b>`, { keyboard: mainCryptoKeyboard(), parseMode: 'HTML' })
  })

feature
  .callbackQuery(cryptoSummaryCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
  })

const bootcamp1 = `${cryptoBootcampCallbackData}1`
const bootcamp2 = `${cryptoBootcampCallbackData}2`
const bootcamp3 = `${cryptoBootcampCallbackData}3`
// const bootcamp4 = `${cryptoBootcampCallbackData}4`

feature.callbackQuery(cryptoBootcampCallbackData, async (ctx) => {
  ctx.notifyAdmin(`Пользователь заинтересовался покупкой Crypto Course: @${ctx.from.username}`)

  await ctx.answerCallbackQuery()
  ctx.updateUserState(cryptoBootcampCallbackData)
  return ctx.answerWithMedia(cryptoBootcampCallbackData, `Чтобы получить доступ к школе по крипте и начать обучение, выполни несколько простых шагов 👇

1. Зарегистрируйся на бирже BingX по ссылке ниже:
https://bingx.com/partner/attic/`, { keyboard: cryptoBootcampKeyboard(scenarioCryptoCallbackData, bootcamp1), leaveLastMessage: ctx.session.userInfo?.previous_state === scenarioCryptoCallbackData })
})

feature.callbackQuery(bootcamp1, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp1)
  return ctx.answerWithMedia(bootcamp1, `2. Зарегистрируйся на сайте ATTIC по моей ссылке:
https://atticalgo.com?promocode=${ctx.config.botAdminRefUrlCode}

<i>*Регистрация именно по этой ссылке откроет доступ к скидке на курсы и другие продукты компании</i>`, { parseMode: 'HTML', keyboard: cryptoBootcampKeyboard(scenarioCryptoCallbackData, bootcamp2), leaveLastMessage: true })
})

feature.callbackQuery(bootcamp2, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp2)
  return ctx.answerWithMedia(bootcamp2, `3. Открой раздел “Продукты” и выбери CRYPTO SCHOOL.

4. Перейди к оплате и активируй курс.

<b>*Если у тебя появляются сложности или нужна помощь, то пиши мне, я на связи</b>`, { keyboard: cryptoBootcampKeyboard(scenarioCryptoCallbackData, bootcamp3), leaveLastMessage: true, parseMode: 'HTML' })
})

// feature.callbackQuery(bootcamp3, async (ctx) => {
//   await ctx.answerCallbackQuery()
//   ctx.updateUserState(bootcamp3)
//   return ctx.answerWithMedia(bootcamp3, `5. Зарегистрируйся на основной бирже BingX по ссылке ниже:
// https://bingx.com/partner/attic/`, { keyboard: cryptoBootcampKeyboard(scenarioCryptoCallbackData, bootcamp4), leaveLastMessage: true })
// })

feature.callbackQuery(bootcamp3, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp3)
  return ctx.answerWithMedia(bootcamp3, `5. В личном кабинете ATTIC зайди в “Настройки → Биржи” и добавь свой UID
(его можно найти в профиле BingX)

Готово! ✅

🖥️ После покупки тебе откроются модули и уроки полностью. Обучение проходит прямо в личном кабинете ATTIC, без сторонних платформ.

Если хочешь - <b>напиши мне лично, и я помогу пройти все шаги и быстрее втянуться в нишу.</b>`, { keyboard: cryptoBootcampKeyboard(scenarioCryptoCallbackData), leaveLastMessage: true, parseMode: 'HTML' })
})

export { composer as scenarioCryptoFeature }
