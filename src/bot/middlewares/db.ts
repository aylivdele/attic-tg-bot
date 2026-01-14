import type { Context } from '#root/bot/context.js'
import type { Middleware } from 'grammy'
import { getUserById, insertNewUser, updateUserInfo } from '#root/database/queries.js'
import { getClient, pool, query } from '../../database/index.js'

export function dbMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    ctx.db = {
      query,
      getClient,
      pool,
    }
    if (ctx.from) {
      ctx.session.userInfo = await getUserById(ctx.from.id, ctx.db)
      if (!ctx.session.userInfo && ctx.update.message?.text !== '/start' && ctx.chat?.type === 'private') {
        await insertNewUser(ctx.from, ctx.chat.id, ctx.db)
        ctx.session.userInfo = await getUserById(ctx.from.id, ctx.db)
      }
    }

    const updateUserState = (newState: string) => {
      const userInfo = ctx.session.userInfo
      if (userInfo) {
        if (userInfo.current_state !== newState) {
          userInfo.previous_state = userInfo.current_state
        }
        userInfo.current_state = newState
      }
    }

    ctx.updateUserState = updateUserState

    await next()

    if (ctx.session.userInfo) {
      await updateUserInfo({ ...ctx.session.userInfo, last_update: Date.now() }, ctx.db)
    }
  }
}
