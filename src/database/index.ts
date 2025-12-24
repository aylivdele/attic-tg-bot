import type { PoolClient } from 'pg'
import { config } from '#root/config.js'
import { logger } from '#root/logger.js'
import { Pool } from 'pg'

// Build pool configuration either from DATABASE_URL or from individual fields
let poolConfig: any
if (config.databaseUrl) {
  poolConfig = { connectionString: config.databaseUrl }
}
else {
  poolConfig = {
    host: config.postgresHost,
    port: config.postgresPort,
    database: config.postgresDb,
    user: config.postgresUser,
    password: config.postgresPassword,
    ssl: config.postgresSsl ? { rejectUnauthorized: false } : undefined,
  }
}

export const pool = new Pool(poolConfig)

pool.on('error', (err: unknown) => {
  logger.error({ err }, 'Unexpected Postgres client error')
})

export async function initDatabase() {
  try {
    await pool.query('SELECT 1')
    logger.info('Database connected')
  }
  catch (err) {
    logger.error({ err }, 'Failed to connect to database')
    throw err
  }
}

export async function closeDatabase() {
  await pool.end()
  logger.info('Database pool closed')
}

export function query(text: string, params?: any[]) {
  return pool.query(text, params)
}

export function getClient(): Promise<PoolClient> {
  return pool.connect()
}

export interface Database {
  pool: Pool
  query: (text: string, params?: any[]) => Promise<any>
  getClient: () => Promise<PoolClient>
}
