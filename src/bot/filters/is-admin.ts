import type { Context } from '#root/bot/context.js'

export function isAdmin(ctx: Context) {
  return !!ctx.from && (ctx.config.botAdmins.includes(ctx.from.id) || ctx.config.notificationSkipUsernames.some(u => u.toLowerCase() === ctx.from?.username?.toLowerCase()))
}
