import type { Context } from '#root/bot/context.js'
import type { MessageEntity } from '@grammyjs/types'
import { robotsBootcampCallbackData, robotsStatisticsCallbackData, scenarioRobotsCallbackData, statisticsAIDescription, statisticsMDescription, statisticsRDescription } from '#root/bot/callback-data/callbacks-robots.js'
import { mainRobotsKeyboard, robotsBootcampKeyboard, robotsStatisticsKeyboard } from '#root/bot/keyboards/robots-keyboards.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature
  .callbackQuery(scenarioRobotsCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
    ctx.updateUserState(scenarioRobotsCallbackData)
    return ctx.answerWithMedia(scenarioRobotsCallbackData, `Посмотри видео и узнай:\n\n— Как выстроить пассивный доход в крипте\n— Что такое торговые роботы простыми словами\n— Как вникнуть в топовое направление алготрейдинга\n— Подойдёт ли это новичку?\n\n❗Смотри прямо сейчас. Через 24 часа доступ будет закрыт`, { keyboard: mainRobotsKeyboard(), entities: [
      {
        offset: 191,
        length: 54,
        type: 'bold',
      },
    ] })
  })

feature
  .callbackQuery(robotsStatisticsCallbackData, async (ctx) => {
    ctx.notifyAdmin(`Пользователь изучает статистику алгоритмов: @${ctx.from.username}`)

    await ctx.answerCallbackQuery()
    ctx.updateUserState(robotsStatisticsCallbackData)
    const text = `Мы предоставляем портфель из 3х алгоритмов:

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
Алгоритм на бирже BingX`
    const entities: MessageEntity[] = [
      {
        offset: 0,
        length: 43,
        type: 'bold',
      },
      {
        offset: 47,
        length: 21,
        type: 'bold',
      },
      {
        offset: 105,
        length: 8,
        type: 'bold',
      },
      {
        offset: 114,
        length: 27,
        type: 'text_link',
        url: 'https://www.myfxbook.com/members/IceFXMarkets/resonance/11537820/UV4DGS56tm5bghbOZRjG',
      },
      {
        offset: 142,
        length: 23,
        type: 'text_link',
        url: 'https://bingx.com/ru-ru/CopyTrading/1998800000066710?accountEnum=BINGX_SWAP_FUTURES&apiIdentity=1468422161599803396',
      },
      {
        offset: 169,
        length: 24,
        type: 'bold',
      },
      {
        offset: 229,
        length: 8,
        type: 'bold',
      },
      {
        offset: 238,
        length: 27,
        type: 'text_link',
        url: 'https://www.myfxbook.com/members/IceFXMarkets/integral-ai/11541485/u8E7h9p7HAN46AglFnUX',
      },
      {
        offset: 266,
        length: 23,
        type: 'text_link',
        url: 'https://bingx.com/ru-ru/CopyTrading/1998800000066758',
      },
      {
        offset: 293,
        length: 19,
        type: 'bold',
      },
      {
        offset: 349,
        length: 7,
        type: 'bold',
      },
      {
        offset: 357,
        length: 27,
        type: 'text_link',
        url: 'https://www.myfxbook.com/members/IceFXMarkets/impulse-x1/10499169/5R1ne5DTZvUKI6mOb46P',
      },
      {
        offset: 385,
        length: 23,
        type: 'text_link',
        url: 'https://bingx.com/ru-ru/CopyTrading/1998800000066757',
      },
    ]

    return ctx.answerWithMedia(robotsStatisticsCallbackData, text, { keyboard: robotsStatisticsKeyboard(robotsStatisticsCallbackData), entities })
  })

feature.callbackQuery([statisticsRDescription, statisticsAIDescription, statisticsMDescription], async (ctx) => {
  await ctx.answerCallbackQuery()
  let fileId: string | undefined
  switch (ctx.callbackQuery.data) {
    case statisticsAIDescription:
      fileId = 'BQACAgIAAxkBAAIBZWlSOx83ApgtAkp-AzIe86J3MfttAAJ1iAAC3zyYSgbCHQhDGTjxNgQ'
      break
    case statisticsRDescription:
      fileId = 'BQACAgIAAxkBAAIBaWlSPS4cJ6ZDtmCiqkO3BS7W0HdJAAKYiAAC3zyYSmRsNULyCXCENgQ'
      break
    case statisticsMDescription:
      fileId = 'BQACAgIAAxkBAAIBZ2lSPQJvMakoRG2qNjyYID8iVdwhAAKTiAAC3zyYSnZm2kSHDaWWNgQ'
      break
  }
  if (fileId === undefined) {
    return
  }
  ctx.editMessageReplyMarkup()
  return ctx.replyWithDocument(fileId, { reply_markup: robotsStatisticsKeyboard(ctx.callbackQuery.data) })
})

const bootcamp1 = `${robotsBootcampCallbackData}1`
const bootcamp2 = `${robotsBootcampCallbackData}2`
const bootcamp3 = `${robotsBootcampCallbackData}3`

feature.callbackQuery(robotsBootcampCallbackData, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(robotsBootcampCallbackData)
  return ctx.answerWithMedia(robotsBootcampCallbackData, `Чтобы получить доступ к торговым роботам, выполни всего несколько шагов 👇

1️. Зарегистрируйся на бирже BingX по специальной ссылке:
https://bingx.com/partner/attic/`, { keyboard: robotsBootcampKeyboard(scenarioRobotsCallbackData, bootcamp1) })
})

feature.callbackQuery(bootcamp1, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp1)
  return ctx.answerWithMedia(bootcamp1, `2. Зарегистрируйся на сайте ATTIC по моей ссылке:
https://atticalgo.com?promocode=DlAdyKE0SK

*Регистрация именно по моей ссылке откроет доступ к бесплатным урокам по крипте`, { keyboard: robotsBootcampKeyboard(robotsBootcampCallbackData, bootcamp2), leaveLastMessage: true })
})

feature.callbackQuery(bootcamp2, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp2)
  return ctx.answerWithMedia(bootcamp2, `3️. В личном кабинете ATTIC зайди в “Настройки → Биржи” и добавь свой UID
(его можно найти в профиле BingX)`, { keyboard: robotsBootcampKeyboard(bootcamp1, bootcamp3), leaveLastMessage: true })
})

feature.callbackQuery(bootcamp3, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp3)
  return ctx.answerWithMedia(bootcamp3, `4️. Заходи в меню “Тарифы” на сайте ATTIC и выбирай тариф PRO (именно он открывает доступ ко всем роботам)

После успешной оплаты свяжись с поддержкой (@atticsupport1), чтобы получить персональную ссылку на подключение к роботам

Готово! ✅

Если хочешь - можешь написать мне лично, и я помогу пройти эти шаги и быстрее подключиться к роботу.`, { keyboard: robotsBootcampKeyboard(bootcamp2), leaveLastMessage: true })
})

export { composer as scenarioRobotsFeature }
