import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedUser } from '@app/types'

const log = Log.child({
  'use-case': 'create-user',
})

class DuplicateUniqueKey extends Error {
  constructor(key: string, value: string) {
    super()

    this.message = `Cannot create new User due to duplicate "${key}" with value "${value}" found.`
  }
}

const createUser = async (data: { username: string; email: string }) => {
  log.trace(data, 'Creating a new user')

  try {
    const { rows } = await DB.query(
      `
    INSERT INTO users
      (email, username)
    VALUES
      ($1, $2)
    RETURNING
      *
  `,
      [data.email, data.username]
    )

    const newUser = rows[0]

    return newUser as SavedUser
  } catch (e: any) {
    const error: Error = e
    log.warn({ err: e }, 'There was an error creating a user.')

    const duplicateText = 'duplicate key value violates unique constraint '
    const duplicateTextIndex = e.message.indexOf(duplicateText)

    if (duplicateTextIndex > -1) {
      log.warn({ err: e }, 'Duplicate Key Error')
      const text = e.message.slice(duplicateTextIndex + duplicateText.length)
      const key = text.replace('"users_', '').replace('_key"', '')

      const error = new DuplicateUniqueKey(
        key,
        data[key as 'username' | 'email']
      )

      throw error
    }

    throw error
  }
}

export default createUser
