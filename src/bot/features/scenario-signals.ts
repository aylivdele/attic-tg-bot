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
Смотри прямо сейчас. Через 24 часа доступ будет закрыт`, mainSignalsKeyboard())
  })

feature
  .callbackQuery(signalsStatisticsCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
    ctx.updateUserState(signalsStatisticsCallbackData)
    return ctx.answerWithMedia(signalsStatisticsCallbackData, ` 🌟 У нас сейчас работает несколько групп с торговыми сигналами

💸 Стоимость:
11 $/мес для зарегистрированных по моей ссылке (15 $/мес без регистрации).

📊 Краткая статистика по каждому каналу:
DUST II
Винрейт: ~74.37%
Сигналов в месяц: ≈181
Цена: 11 $/мес

MIRAGE
Винрейт: ~83.95%
Сигналов в месяц: ≈104
Цена: 11 $/мес

INFERNO
Винрейт: ~63.79%
Сигналов в месяц: ≈74
Цена: 11 $/мес
Особенность: встроенный Risk/Reward позволяет стратегии оставаться прибыльной даже при винрейте ниже 66%.

VERTIGO
Винрейт: ~72.33%
Сигналов в месяц: ≈39
Цена: 11 $/мес

NUKE
Винрейт: ~68.67%
Сигналов в месяц: ≈73
Цена: 11 $/мес

ANUBIS
Винрейт: ~68.40%
Сигналов в месяц: ≈115
Цена: 11 $/мес`, signalsStatisticsKeyboard(signalsStatisticsCallbackData))
  })

const bootcamp1 = `${signalsBootcampCallbackData}1`
const bootcamp2 = `${signalsBootcampCallbackData}2`
const bootcamp3 = `${signalsBootcampCallbackData}3`

feature.callbackQuery(signalsBootcampCallbackData, async (ctx) => {
  ctx.notifyAdmin(`Пользователь заинтересовался покупкой сигналов: @${ctx.from.username}`)

  await ctx.answerCallbackQuery()
  ctx.updateUserState(signalsBootcampCallbackData)
  return ctx.answerWithMedia(signalsBootcampCallbackData, `Чтобы получить доступ к сигналам и обучению по работе с ними, выполни несколько шагов 👇

1️. Зарегистрируйся на бирже BingX по специальной ссылке:
https://bingx.com/partner/attic/`, signalsBootcampKeyboard(scenarioSignalsCallbackData, bootcamp1))
})

feature.callbackQuery(bootcamp1, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp1)
  return ctx.answerWithMedia(bootcamp1, `2. Зарегистрируйся на сайте ATTIC по моей ссылке:
https://atticalgo.com?promocode=DlAdyKE0SK

*Регистрация именно по этой ссылке откроет доступ к скидке на сигналы и другие продукты компании`, signalsBootcampKeyboard(signalsBootcampCallbackData, bootcamp2))
})

feature.callbackQuery(bootcamp2, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp2)
  return ctx.answerWithMedia(bootcamp2, `3️. В личном кабинете ATTIC зайди в “Настройки → Биржи” и добавь свой UID
(его можно найти в профиле BingX)`, signalsBootcampKeyboard(bootcamp1, bootcamp3))
})

feature.callbackQuery(bootcamp3, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp3)
  return ctx.answerWithMedia(bootcamp3, `4️. Перейди в меню “Продукты”, далее “SIGNALS” и выбери нужные группы
(В видео выше я показываю как это сделать)

5️. После оплаты доступ откроется автоматически для каждой выбранной группы

Готово! ✅

💡 После выполнения шага 3 (при условии регистрации по моей ссылке) у тебя также откроются 3 урока в нашей CRYPTO SCHOOL, где ты разберёшься, как правильно открывать сделки по сигналам.

Если хочешь - напиши мне лично, и я помогу пройти все шаги и быстрее втянуться в нишу.`, signalsBootcampKeyboard(bootcamp2))
})

export { composer as scenarioSignalsFeature }
