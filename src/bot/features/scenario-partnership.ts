import type { Context } from '#root/bot/context.js'
import { partnershipBootcampCallbackData, scenarioPartnershipCallbackData } from '#root/bot/callback-data/callbacks-partnership.js'
import { getRefText } from '#root/bot/helpers/refText.js'
import { mainPartnershipKeyboard, partnershipBootcampKeyboard } from '#root/bot/keyboards/partnership-keyboards.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature
  .callbackQuery(scenarioPartnershipCallbackData, async (ctx) => {
    ctx.notifyAdmin(`Пользователь интересуется партнеркой: @${ctx.from.username}`, ctx.from.username)

    await ctx.answerCallbackQuery()
    ctx.updateUserState(scenarioPartnershipCallbackData)
    return ctx.answerWithMedia(scenarioPartnershipCallbackData, getRefText(), { keyboard: mainPartnershipKeyboard(), parseMode: 'HTML' })
  })

const bootcamp1 = `${partnershipBootcampCallbackData}1`
const bootcamp2 = `${partnershipBootcampCallbackData}2`
const bootcamp3 = `${partnershipBootcampCallbackData}3`
// const bootcamp4 = `${partnershipBootcampCallbackData}4`

feature.callbackQuery(partnershipBootcampCallbackData, async (ctx) => {
  ctx.notifyAdmin(`Пользователь заинтересовался покупкой партнерского тарифа: @${ctx.from.username}`, ctx.from.username)

  await ctx.answerCallbackQuery()
  ctx.updateUserState(partnershipBootcampCallbackData)
  return ctx.answerWithMedia(partnershipBootcampCallbackData, `Чтобы получить доступ к партнерской сети и нашей команде, выполни несколько простых шагов 👇

1. Зарегистрируйся на бирже BingX по ссылке ниже:
https://bingx.com/partner/attic/`, { keyboard: partnershipBootcampKeyboard(scenarioPartnershipCallbackData, bootcamp1), leaveLastMessage: ctx.session.userInfo?.previous_state === scenarioPartnershipCallbackData })
})

feature.callbackQuery(bootcamp1, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp1)
  return ctx.answerWithMedia(bootcamp1, `2. Зарегистрируйся на сайте ATTIC по моей ссылке:
https://atticalgo.com?promocode=${ctx.config.botAdminRefUrlCode}

<i>*Регистрация именно по этой ссылке откроет доступ к скидке на тарифы и другие продукты компании</i>`, { keyboard: partnershipBootcampKeyboard(scenarioPartnershipCallbackData, bootcamp2), leaveLastMessage: true, parseMode: 'HTML' })
})

feature.callbackQuery(bootcamp2, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp2)
  return ctx.answerWithMedia(bootcamp2, `3. Перейди в меню “Тарифы”, выбери желаемый партнерский тариф и произведи оплату
(В видео выше я показываю как это сделать)

<b>*Если у тебя появляются сложности или нужна помощь, то пиши мне, я на связи</b>

<blockquote>Важный момент! Если ты первый раз скачал и зарегистрировал биржу BingX, то на ней есть правила, что при первой покупке криптовалюты в день регистрации, для твоей безопасности средства ограничиваются на 24 часа для вывода или оплаты

Что бы не терять время, ты можешь связаться со мной и я дам доступ к трем бесплатным урокам что бы ты уже мог углубляться в рынок крипты</blockquote>

<blockquote>Если у тебя уже была биржа BingX и ты просто вставил реф. код и перенес верификацию, то это на тебя не распространяется, ты можешь пользоваться криптой сразу</blockquote>`, { keyboard: partnershipBootcampKeyboard(scenarioPartnershipCallbackData, bootcamp3), leaveLastMessage: true, parseMode: 'HTML' })
})

// feature.callbackQuery(bootcamp3, async (ctx) => {
//   await ctx.answerCallbackQuery()
//   ctx.updateUserState(bootcamp3)
//   return ctx.answerWithMedia(bootcamp3, `4. Зарегистрируйся на основной бирже BingX по ссылке ниже:
// https://bingx.com/partner/attic/`, { keyboard: partnershipBootcampKeyboard(scenarioPartnershipCallbackData, bootcamp4), leaveLastMessage: true })
// })

feature.callbackQuery(bootcamp3, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp3)
  return ctx.answerWithMedia(bootcamp3, `4. В личном кабинете ATTIC зайди в “Настройки → Биржи” и добавь свой UID
(его можно найти в профиле BingX)

5. После оплаты тарифа и ввода UID на сайте тебе откроется доступ к нашим командным чатам и моему сопровождению
Также, после оплаты напиши мне “Я в игре” и я отправлю тебе гайд с помощью которого уже десятки человек заработали больше миллиона рублей с партнерской программы

Готово! ✅

Если хочешь - <b>напиши мне лично, и я помогу пройти все шаги и быстрее втянуться в нишу.</b>`, { keyboard: partnershipBootcampKeyboard(scenarioPartnershipCallbackData), leaveLastMessage: true, parseMode: 'HTML' })
})

export { composer as scenarioPartnershipFeature }
