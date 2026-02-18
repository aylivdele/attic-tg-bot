import type { Context } from '#root/bot/context.js'
import type { Middleware } from 'grammy'

export function notificationsMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    const notifyAdmin = (text: string, username?: string): Promise<any> => {
      if (ctx.config.notificationChat && (!username || !ctx.config.notificationSkipUsernames.some(u => username.toLowerCase() === u.toLowerCase()))) {
        return ctx.api.sendMessage(ctx.config.notificationChat, text, { parse_mode: 'HTML' })
      }
      return Promise.resolve()
    }
    ctx.notifyAdmin = notifyAdmin
    await next()
  }
}
