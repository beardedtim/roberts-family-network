import Log from '@app/monitoring/log'
import { Pool } from 'pg'
import * as SystemWide from '@app/domains/internal/bus'

const log = Log.child({
  connection: 'datbase',
})

export const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
})

export default pool

SystemWide.bus.once(SystemWide.EVENTS.EXIT, async ({ payload }) => {
  log.trace({ reason: payload.reason }, 'Requested shutdown. Disconnecting')
  await pool.end()
})
