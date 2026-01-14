import type { Context } from '#root/bot/context.js'
import { startMenuCallbackData } from '#root/bot/callback-data/callbacks-start.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { createStartKeyboard } from '#root/bot/keyboards/start.js'
import { getMediaForMessage, insertNewUser } from '#root/database/queries.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.command(startMenuCallbackData, logHandle('command-start'), async (ctx) => {
  if (!ctx.session.userInfo) {
    ctx.notifyAdmin(`Новый пользователь в боте: @${ctx.from.username}`, ctx.from.username)
    const media = await getMediaForMessage(`${startMenuCallbackData}_circle`, ctx.db)
    const circle = media?.filter(m => m.media_type === 'videonote')?.[0]
    if (circle) {
      await ctx.replyWithVideoNote(circle.file_id)
    }
  }
  await insertNewUser(ctx.from, ctx.chat.id, ctx.db)
  return await ctx.answerWithMedia(startMenuCallbackData, `Отлично, давай определимся, что тебе сейчас ближе 👇

— Крипто-школа - для базового понимания криптовалют 
— Трейдинг-курс - самостоятельно торгуй и зарабатывай уже через месяц
— Сигналы - входи в сделки по сигналам профи
— Торговые роботы - автоматизируй трейдинг, ты спишь, а твои деньги работают 10% в месяц
— Партнерская программа - зарабатывай 11.000RUB за каждого приглашенного друга

Если хочешь связаться со мной лично и сразу обсудить детали - нажимай «Хочу пообщаться лично»`, { keyboard: createStartKeyboard(ctx) })
})

feature
  .callbackQuery(startMenuCallbackData, async (ctx) => {
    await ctx.answerCallbackQuery()
    ctx.updateUserState(startMenuCallbackData)
    return ctx.answerWithMedia(startMenuCallbackData, `Отлично, давай определимся, что тебе сейчас ближе 👇

— Крипто-школа - для базового понимания криптовалют 
— Трейдинг-курс - самостоятельно торгуй и зарабатывай уже через месяц
— Сигналы - входи в сделки по сигналам профи
— Торговые роботы - автоматизиуй трейдинг, ты спишь, а твои деньги работают 10% в месяц
— Партнерская программа - зарабатывай 11.000RUB за каждого приглашенного друга

Если хочешь связаться со мной лично и сразу обсудить детали - нажимай «Хочу пообщаться лично»`, { keyboard: createStartKeyboard(ctx) })
  })

export { composer as welcomeFeature }
