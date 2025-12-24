import type { Database } from '#root/database/index.js'
import type { User } from '@grammyjs/types'
import { getBotId } from '#root/bot/helpers/botId.js'

export function insertNewUser(from: User, db: Database) {
  return db.query(
    `INSERT INTO users (id, bot_id, first_name, last_name, username, current_state)
         VALUES ($1, $2, $3, $4, $5, $6) on conflict (id, bot_id) do update set current_state = EXCLUDED.current_state`,
    [from.id, getBotId(), from.first_name, from.last_name, from.username, 'start'],
  )
}

export function updateUserState(userId: number, state: string, db: Database) {
  return db.query('UPDATE users SET current_state = $1 WHERE id = $2 and bot_id = $3', [state, userId, getBotId()])
}
