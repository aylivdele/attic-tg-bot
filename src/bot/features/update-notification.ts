import type { Context } from '#root/bot/context.js'
import { getMentionString } from '#root/bot/helpers/mention.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.use(async (ctx, next) => {
  if (ctx.session.userInfo && (ctx.session.userInfo.last_update + 1000 * 60 * 60 * 24) < Date.now()) {
    ctx.notifyAdmin(`Пользователь восстановил активность в боте: ${getMentionString(ctx.session.userInfo)}`, ctx.from.username)
  }
  // logger.debug(`Last update of ${ctx.from.username}(${ctx.from.id}) = ${ctx.session.userInfo ?? 'not found'}`)
  await next()
})

export { composer as cameBackFeature }
