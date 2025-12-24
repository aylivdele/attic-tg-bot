import type { Context } from '#root/bot/context.js'
import type { Middleware } from 'grammy'
import { getClient, pool, query } from '../../database/index.js'

export function dbMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    ctx.db = {
      query,
      getClient,
      pool,
    }
    await next()
  }
}
