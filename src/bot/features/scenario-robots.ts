import type { Context } from '#root/bot/context.js'
import { robotsBootcampCallbackData, robotsStatisticsCallbackData, scenarioRobotsCallbackData, statisticsAIDescription, statisticsMDescription, statisticsRDescription } from '#root/bot/callback-data/callbacks-robots.js'
import { mainRobotsKeyboard, robotsBootcampKeyboard, robotsStatisticsKeyboard } from '#root/bot/keyboards/robots-keyboards.js'
import { updateUserState } from '#root/database/queries.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature
  .callbackQuery(scenarioRobotsCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
    await updateUserState(ctx.from.id, scenarioRobotsCallbackData, ctx.db)
    return ctx.answerWithMedia(`Посмотри видео и узнай как выстроить: 
— пассивный доход в крипте
— что такое торговые роботы простыми словами
— как вникнуть в топовое направление алготрейдинга
— подойдет ли это новичку?
Смотри прямо сейчас. Через 24 часа доступ будет закрыт`, scenarioRobotsCallbackData, mainRobotsKeyboard())
  })

feature
  .callbackQuery(robotsStatisticsCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
    await updateUserState(ctx.from.id, robotsStatisticsCallbackData, ctx.db)
    return ctx.answerWithMedia(`Мы предоставляем портфель из 3х алгоритмов:

ATTIC - R (Resonance):
Доход за 11 месяцев 2025 года: +101.06%
Верифицированная статистика
Алгоритм на бирже BingX

ATTIC - Ai (Integral Ai)
Доход за 11 месяцев 2025 года: +79.59%
Верифицированная статистика
Алгоритм на бирже BingX
ATTIC - M (Impulse)
Доход за 11 месяцев 2025 года: +61.13%
Верифицированная статистика
Алгоритм на бирже BingX`, robotsStatisticsCallbackData, robotsStatisticsKeyboard(robotsStatisticsCallbackData))
  })

feature.callbackQuery([statisticsRDescription, statisticsAIDescription, statisticsMDescription], async (ctx) => {
  await ctx.answerCallbackQuery()
  return ctx.answerWithMedia('', ctx.callbackQuery.data, robotsStatisticsKeyboard(ctx.callbackQuery.data))
})

const bootcamp1 = `${robotsBootcampCallbackData}1`
const bootcamp2 = `${robotsBootcampCallbackData}2`
const bootcamp3 = `${robotsBootcampCallbackData}3`

feature.callbackQuery(robotsBootcampCallbackData, async (ctx) => {
  await ctx.answerCallbackQuery()
  await updateUserState(ctx.from.id, robotsBootcampCallbackData, ctx.db)
  return ctx.answerWithMedia(`Чтобы получить доступ к торговым роботам, выполни всего несколько шагов 👇

1️. Зарегистрируйся на бирже BingX по специальной ссылке:
https://bingx.com/partner/attic/`, robotsBootcampCallbackData, robotsBootcampKeyboard(scenarioRobotsCallbackData, bootcamp1))
})

feature.callbackQuery(bootcamp1, async (ctx) => {
  await ctx.answerCallbackQuery()
  await updateUserState(ctx.from.id, bootcamp1, ctx.db)
  return ctx.answerWithMedia(`2. Зарегистрируйся на сайте ATTIC по моей ссылке:
https://atticalgo.com?promocode=DlAdyKE0SK

*Регистрация именно по моей ссылке откроет доступ к бесплатным урокам по крипте`, bootcamp1, robotsBootcampKeyboard(robotsBootcampCallbackData, bootcamp2))
})

feature.callbackQuery(bootcamp2, async (ctx) => {
  await ctx.answerCallbackQuery()
  await updateUserState(ctx.from.id, bootcamp2, ctx.db)
  return ctx.answerWithMedia(`3️. В личном кабинете ATTIC зайди в “Настройки → Биржи” и добавь свой UID
(его можно найти в профиле BingX)`, bootcamp2, robotsBootcampKeyboard(bootcamp1, bootcamp3))
})

feature.callbackQuery(bootcamp3, async (ctx) => {
  await ctx.answerCallbackQuery()
  await updateUserState(ctx.from.id, bootcamp3, ctx.db)
  return ctx.answerWithMedia(`4️. Заходи в меню “Тарифы” на сайте ATTIC и выбирай тариф PRO (именно он открывает доступ ко всем роботам)

После успешной оплаты свяжись с поддержкой (@atticsupport1), чтобы получить персональную ссылку на подключение к роботам

Готово! ✅

Если хочешь - можешь написать мне лично, и я помогу пройти эти шаги и быстрее подключиться к роботу.`, bootcamp3, robotsBootcampKeyboard(bootcamp2))
})

export { composer as scenarioRobotsFeature }
