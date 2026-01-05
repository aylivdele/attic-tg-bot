import type { Context } from '#root/bot/context.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.use((ctx) => {
  if (ctx.session.userInfo && (ctx.session.userInfo.last_update + 1000 * 60 * 60 * 24) < Date.now()) {
    ctx.notifyAdmin(`Пользователь восстановил активность в боте: @${ctx.session.userInfo.username}`)
  }
})

export { composer as cameBackFeature }
