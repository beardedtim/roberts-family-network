import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedUser } from '@app/types'

const log = Log.child({
  'use-case': 'find-all-userfs',
})

const findAllUsers = async () => {
  log.trace('Finding all users')

  const { rows } = await DB.query(
    `SELECT
      *
    FROM
      users
  `
  )

  return rows as SavedUser[]
}

export default findAllUsers
