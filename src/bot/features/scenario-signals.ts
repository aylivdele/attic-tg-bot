import type { Context } from '#root/bot/context.js'
import { scenarioSignalsCallbackData, signalsBootcampCallbackData, signalsStatisticsCallbackData } from '#root/bot/callback-data/callbacks-signals.js'
import { mainSignalsKeyboard, signalsBootcampKeyboard, signalsStatisticsKeyboard } from '#root/bot/keyboards/signals-keyboards.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature
  .callbackQuery(scenarioSignalsCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
    ctx.updateUserState(scenarioSignalsCallbackData)
    return ctx.answerWithMedia(scenarioSignalsCallbackData, `Посмотри видео и узнай: 

— как зарабатывать на сигналах, не разбираясь в графиках
— что такое сигналы простыми словами
— готовая инструкция как открывать сделки
— подойдет ли это новичку
— с какой суммы можно начать

Смотри прямо сейчас. <b>Через 24 часа доступ будет закрыт</b>`, { keyboard: mainSignalsKeyboard(), parseMode: 'HTML' })
  })

feature
  .callbackQuery(signalsStatisticsCallbackData, async (ctx) => {
    ctx.notifyAdmin(`Пользователь изучает статистику сигналов: @${ctx.from.username}`)
    await ctx.answerCallbackQuery()
    ctx.updateUserState(signalsStatisticsCallbackData)
    return ctx.answerWithMedia(signalsStatisticsCallbackData, `🌟 У нас сейчас работает несколько групп с торговыми сигналами

💸 <b>Стоимость:</b>
11 $/мес для зарегистрированных по моей ссылке (15 $/мес без регистрации).

📊 <b>Краткая статистика по каждому каналу:</b>

<b>DUST II</b>
• Винрейт: ~74.37%
• Сигналов в месяц: ≈181
• Цена: 11 $/мес

<b>MIRAGE</b>
• Винрейт: ~83.95%
• Сигналов в месяц: ≈104
• Цена: 11 $/мес

<b>INFERNO</b>
• Винрейт: ~63.79%
• Сигналов в месяц: ≈74
• Цена: 11 $/мес
• Особенность: встроенный Risk/Reward позволяет стратегии оставаться прибыльной даже при винрейте ниже 66%

<b>VERTIGO</b>
• Винрейт: ~72.33%
• Сигналов в месяц: ≈39
• Цена: 11 $/мес

<b>NUKE</b>
• Винрейт: ~68.67%
• Сигналов в месяц: ≈73
• Цена: 11 $/мес

<b>ANUBIS</b>
• Винрейт: ~68.40%
• Сигналов в месяц: ≈115
• Цена: 11 $/мес`, { keyboard: signalsStatisticsKeyboard(signalsStatisticsCallbackData), parseMode: 'HTML' })
  })

const bootcamp1 = `${signalsBootcampCallbackData}1`
const bootcamp2 = `${signalsBootcampCallbackData}2`
const bootcamp3 = `${signalsBootcampCallbackData}3`
const bootcamp4 = `${signalsBootcampCallbackData}4`

feature.callbackQuery(signalsBootcampCallbackData, async (ctx) => {
  ctx.notifyAdmin(`Пользователь заинтересовался покупкой сигналов: @${ctx.from.username}`)

  await ctx.answerCallbackQuery()
  ctx.updateUserState(signalsBootcampCallbackData)
  return ctx.answerWithMedia(signalsBootcampCallbackData, `Чтобы получить доступ к сигналам и обучению по работе с ними, выполни несколько шагов 👇

1. Зарегистрируйся на бирже Bitget по специальной ссылке:
https://partner.bitget.com/bg/ATTIC`, { keyboard: signalsBootcampKeyboard(scenarioSignalsCallbackData, bootcamp1), leaveLastMessage: ctx.session.userInfo?.previous_state === scenarioSignalsCallbackData })
})

feature.callbackQuery(bootcamp1, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp1)
  return ctx.answerWithMedia(bootcamp1, `2. Зарегистрируйся на сайте ATTIC по моей ссылке:
${ctx.config.botAdminRefUrl}

*Регистрация именно по этой ссылке откроет доступ к скидке на сигналы и другие продукты компании`, { keyboard: signalsBootcampKeyboard(scenarioSignalsCallbackData, bootcamp2), leaveLastMessage: true })
})

feature.callbackQuery(bootcamp2, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp2)
  return ctx.answerWithMedia(bootcamp2, `3. Перейди в меню “Продукты”, далее “СИГНАЛЫ”, выбери желаемые группы и произведи оплату
(В видео выше я показываю как это сделать)`, { keyboard: signalsBootcampKeyboard(scenarioSignalsCallbackData, bootcamp3), leaveLastMessage: true })
})

feature.callbackQuery(bootcamp3, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp3)
  return ctx.answerWithMedia(bootcamp3, `4. Зарегистрируйся на основной бирже BingX по ссылке ниже:
https://bingx.com/partner/attic/`, { keyboard: signalsBootcampKeyboard(scenarioSignalsCallbackData, bootcamp4), leaveLastMessage: true })
})

feature.callbackQuery(bootcamp4, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp4)
  return ctx.answerWithMedia(bootcamp4, `5. В личном кабинете ATTIC зайди в “Настройки → Биржи” и добавь свой UID
(его можно найти в профиле BingX)

6. После оплаты и ввода UID на сайте, доступ откроется автоматически для каждой выбранной группы

Готово! ✅

💡 После выполнения шага 2 (при условии регистрации по моей ссылке) у тебя также откроются 3 урока в нашей CRYPTO SCHOOL, где ты разберёшься как правильно открывать сделки по сигналам.

Если хочешь - <b>напиши мне лично, и я помогу пройти все шаги и быстрее втянуться в нишу.</b>`, { keyboard: signalsBootcampKeyboard(scenarioSignalsCallbackData), leaveLastMessage: true, parseMode: 'HTML' })
})

export { composer as scenarioSignalsFeature }
