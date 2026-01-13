import type { Context } from '#root/bot/context.js'
import { robotsBootcampCallbackData, robotsStatisticsCallbackData, scenarioRobotsCallbackData, statisticsAIDescription, statisticsMDescription, statisticsRDescription } from '#root/bot/callback-data/callbacks-robots.js'
import { mainRobotsKeyboard, robotsBootcampKeyboard, robotsStatisticsKeyboard } from '#root/bot/keyboards/robots-keyboards.js'
import { getMediaForMessage } from '#root/database/queries.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature
  .callbackQuery(scenarioRobotsCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
    ctx.notifyAdmin(`Пользователь смотрит информацию про торговых роботов: @${ctx.from.username}`)
    ctx.updateUserState(scenarioRobotsCallbackData)
    if (ctx.session.userInfo?.previous_state === robotsStatisticsCallbackData) {
      return ctx.editMessageReplyMarkup({ reply_markup: mainRobotsKeyboard() })
    }
    // ctx.callbackQuery.message?.video
    return ctx.answerWithMedia(scenarioRobotsCallbackData, `Посмотри видео и узнай:\n\n— Как выстроить пассивный доход в крипте\n— Что такое торговые роботы простыми словами\n— Как вникнуть в топовое направление алготрейдинга\n— Подойдёт ли это новичку?\n\n❗Смотри прямо сейчас. <b>Через 24 часа доступ будет закрыт</b>`, { keyboard: mainRobotsKeyboard(), parseMode: 'HTML' })
  })

// <a href="https://bingx.com/ru-ru/CopyTrading/1998800000066710?accountEnum=BINGX_SWAP_FUTURES&apiIdentity=1468422161599803396">Алгоритм на бирже BingX</a>
// <a href="https://bingx.com/ru-ru/CopyTrading/1998800000066758">Алгоритм на бирже BingX</a>
// <a href="https://bingx.com/ru-ru/CopyTrading/1998800000066757">Алгоритм на бирже BingX</a>

feature
  .callbackQuery(robotsStatisticsCallbackData, async (ctx) => {
    ctx.notifyAdmin(`Пользователь изучает статистику алгоритмов: @${ctx.from.username}`)

    await ctx.answerCallbackQuery()
    ctx.updateUserState(robotsStatisticsCallbackData)
    const text = `<b>Мы предоставляем портфель из 3х алгоритмов:</b>

💰<b>ATTIC - R (Resonance):</b>
Доход за 11 месяцев 2025 года: +101.06%
<a href="https://www.myfxbook.com/members/IceFXMarkets/resonance/11537820/UV4DGS56tm5bghbOZRjG">Верифицированная статистика</a>

💰<b>ATTIC - Ai (Integral Ai)</b>
Доход за 11 месяцев 2025 года: +79.59%
<a href="https://www.myfxbook.com/members/IceFXMarkets/integral-ai/11541485/u8E7h9p7HAN46AglFnUX">Верифицированная статистика</a>

💰<b>ATTIC - M (Impulse)</b>
Доход за 11 месяцев 2025 года: +61.13%
<a href="https://www.myfxbook.com/members/IceFXMarkets/impulse-x1/10499169/5R1ne5DTZvUKI6mOb46P">Верифицированная статистика</a>`

    return ctx.answerWithMedia(robotsStatisticsCallbackData, text, { keyboard: robotsStatisticsKeyboard(robotsStatisticsCallbackData), parseMode: 'HTML' })
  })

feature.callbackQuery([statisticsRDescription, statisticsAIDescription, statisticsMDescription], async (ctx) => {
  await ctx.answerCallbackQuery()
  return getMediaForMessage(ctx.callbackQuery.data, ctx.db).then((media) => {
    if (!media || media[0].media_type !== 'document' || media[0].file_id === undefined) {
      return
    }
    ctx.editMessageReplyMarkup()
    return ctx.replyWithDocument(media[0].file_id, { reply_markup: robotsStatisticsKeyboard(ctx.callbackQuery.data) })
  })
})

const bootcamp1 = `${robotsBootcampCallbackData}1`
const bootcamp2 = `${robotsBootcampCallbackData}2`
const bootcamp3 = `${robotsBootcampCallbackData}3`
// const bootcamp4 = `${robotsBootcampCallbackData}4`

feature.callbackQuery(robotsBootcampCallbackData, async (ctx) => {
  ctx.notifyAdmin(`Пользователь изучает как подключить роботов: @${ctx.from.username}`)
  await ctx.answerCallbackQuery()
  ctx.updateUserState(robotsBootcampCallbackData)
  return ctx.answerWithMedia(robotsBootcampCallbackData, `Чтобы получить доступ к торговым роботам, выполни всего несколько шагов 👇

1. Зарегистрируйся на бирже BingX по ссылке ниже:
https://bingx.com/partner/attic/`, { keyboard: robotsBootcampKeyboard(scenarioRobotsCallbackData, bootcamp1), leaveLastMessage: ctx.session.userInfo?.previous_state === scenarioRobotsCallbackData })
})

feature.callbackQuery(bootcamp1, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp1)
  return ctx.answerWithMedia(bootcamp1, `2. Зарегистрируйся на сайте ATTIC по моей ссылке:
https://atticalgo.com?promocode=${ctx.config.botAdminRefUrlCode}

<i>*Регистрация именно по моей ссылке откроет доступ к бесплатным урокам по крипте</i>`, { parseMode: 'HTML', keyboard: robotsBootcampKeyboard(scenarioRobotsCallbackData, bootcamp2), leaveLastMessage: true })
})

feature.callbackQuery(bootcamp2, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp2)
  return ctx.answerWithMedia(bootcamp2, `3. Заходи в меню “Тарифы” на сайте ATTIC, выбирай тариф PRO (именно он открывает доступ ко всем роботам) и произведи оплату
(В видео выше я показываю как это сделать)

<b>*Если у тебя появляются сложности или нужна помощь, то пиши мне, я на связи</b>

<blockquote>Важный момент! Если ты первый раз скачал и зарегистрировал биржу BingX, то на ней есть правила, что при первой покупке криптовалюты в день регистрации, для твоей безопасности средства ограничиваются на 24 часа для вывода или оплаты

Что бы не терять время, ты можешь связаться со мной и я дам доступ к трем бесплатным урокам что бы ты уже мог углубляться в рынок крипты</blockquote>

<blockquote>Если у тебя уже была биржа BingX и ты просто вставил реф. код и перенес верификацию, то это на тебя не распространяется, ты можешь пользоваться криптой сразу</blockquote>`, { keyboard: robotsBootcampKeyboard(scenarioRobotsCallbackData, bootcamp3), leaveLastMessage: true, parseMode: 'HTML' })
})

// feature.callbackQuery(bootcamp3, async (ctx) => {
//   await ctx.answerCallbackQuery()
//   ctx.updateUserState(bootcamp3)
//   return ctx.answerWithMedia(bootcamp3, `4. Зарегистрируйся на основной бирже BingX по ссылке ниже:
// https://bingx.com/partner/attic/`, { keyboard: robotsBootcampKeyboard(scenarioRobotsCallbackData, bootcamp4), leaveLastMessage: true })
// })

feature.callbackQuery(bootcamp3, async (ctx) => {
  await ctx.answerCallbackQuery()
  ctx.updateUserState(bootcamp3)
  return ctx.answerWithMedia(bootcamp3, `4. В личном кабинете ATTIC зайди в “Настройки → Биржи” и добавь свой UID
(его можно найти в профиле BingX)

После успешной оплаты свяжись с поддержкой (@atticsupport1), чтобы получить персональную ссылку на подключение к роботам

Готово! ✅

Если хочешь - <b>можешь написать мне лично, и я помогу пройти эти шаги и быстрее подключиться к роботу.</b>`, { keyboard: robotsBootcampKeyboard(scenarioRobotsCallbackData), leaveLastMessage: true, parseMode: 'HTML' })
})

export { composer as scenarioRobotsFeature }
