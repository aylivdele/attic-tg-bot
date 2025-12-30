import type { Context } from '#root/bot/context.js'
import { partnershipBootcampCallbackData, scenarioPartnershipCallbackData } from '#root/bot/callback-data/callbacks-partnership.js'
import { mainpartnershipKeyboard, partnershipBootcampKeyboard } from '#root/bot/keyboards/partnership-keyboards.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature
  .callbackQuery(scenarioPartnershipCallbackData, async (ctx) => {
    ctx.notifyAdmin(`Пользователь интересуется партнеркой: @${ctx.from.username}`)

    await ctx.answerCallbackQuery()
    ctx.updateUserState(scenarioPartnershipCallbackData)
    return ctx.answerWithMedia(scenarioPartnershipCallbackData, `Видео о том как я в 21 год купила ролекс улетела жить в мексику и купила маме квартиру.`, { keyboard: mainpartnershipKeyboard() })
  })

const bootcamp1 = `${partnershipBootcampCallbackData}1`
const bootcamp2 = `${partnershipBootcampCallbackData}2`
const bootcamp3 = `${partnershipBootcampCallbackData}3`

feature.callbackQuery(partnershipBootcampCallbackData, async (ctx) => {
  ctx.notifyAdmin(`Пользователь заинтересовался покупкой партнерского тарифа: @${ctx.from.username}`)

  await ctx.answerCallbackQuery()
  ctx.updateUserState(partnershipBootcampCallbackData)
  return ctx.answerWithMedia(partnershipBootcampCallbackData, `Чтобы получить доступ к партнерской сети и нашей команде, выполни несколько простых шагов 👇

1. Зарегистрируйся на бирже BingX по специальной ссылке:
https://bingx.com/partner/attic/`, { keyboard: partnershipBootcampKeyboard(scenarioPartnershipCallbackData, bootcamp1), leaveLastMessage: ctx.session.userInfo?.previous_state === scenarioPartnershipCallbackData })
})

feature.callbackQuery(bootcamp1, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp1)
  return ctx.answerWithMedia(bootcamp1, `2. Зарегистрируйся на сайте ATTIC по моей ссылке:
https://atticalgo.com?promocode=DlAdyKE0SK

*Регистрация именно по этой ссылке откроет доступ к скидке на тарифы и другие продукты компании`, { keyboard: partnershipBootcampKeyboard(scenarioPartnershipCallbackData, bootcamp2), leaveLastMessage: true })
})

feature.callbackQuery(bootcamp2, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp2)
  return ctx.answerWithMedia(bootcamp2, `3. Перейди в меню “Тарифы” и выбери желаемый партнерский тариф
(В видео выше я показываю как это сделать)`, { keyboard: partnershipBootcampKeyboard(scenarioPartnershipCallbackData, bootcamp3), leaveLastMessage: true })
})

feature.callbackQuery(bootcamp3, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp3)
  return ctx.answerWithMedia(bootcamp3, `4. В личном кабинете ATTIC зайди в “Настройки → Биржи” и добавь свой UID
(его можно найти в профиле BingX)

5. После оплаты тарифа тебе откроется доступ к нашим командным чатам и моему сопровождению
Также, после оплаты напиши мне “Я в игре” и я отправлю тебе гайд с помощью которого уже десятки человек заработали больше миллиона рублей с партнерской программы

Готово! ✅

Если хочешь - <b>напиши мне лично, и я помогу пройти все шаги и быстрее втянуться в нишу.</b>`, { keyboard: partnershipBootcampKeyboard(scenarioPartnershipCallbackData), leaveLastMessage: true, parseMode: 'HTML' })
})

export { composer as scenarioPartnershipFeature }
