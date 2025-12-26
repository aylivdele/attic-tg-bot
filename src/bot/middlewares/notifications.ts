import type { Context } from '#root/bot/context.js'
import type { Middleware } from 'grammy'

export function notificationsMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    const notifyAdmin = (text: string): Promise<any> => {
      if (ctx.config.notificationChat) {
        return ctx.api.sendMessage(ctx.config.notificationChat, text)
      }
      return Promise.resolve()
    }
    ctx.notifyAdmin = notifyAdmin
    await next()
  }
}
