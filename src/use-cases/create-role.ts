import Log from '@app/monitoring/log'
import DB from '@app/connections/database'

const log = Log.child({
  'use-case': 'create-role',
})

class DuplicateUniqueKey extends Error {
  constructor(key: string, value: string) {
    super()

    this.message = `Cannot create new Role due to duplicate "${key}" with value "${value}" found.`
  }
}

const createRole = async (data: { name: string }) => {
  log.trace(data, 'Creating a new role')

  try {
    const { rows } = await DB.query(
      `
    INSERT INTO roles
      (name)
    VALUES
      ($1)
    RETURNING
      *
  `,
      [data.name]
    )

    const newUser = rows[0]

    return newUser
  } catch (e: any) {
    const error: Error = e
    log.warn({ err: e }, 'There was an error creating a user.')

    const duplicateText = 'duplicate key value violates unique constraint '
    const duplicateTextIndex = e.message.indexOf(duplicateText)

    if (duplicateTextIndex > -1) {
      log.warn({ err: e }, 'Duplicate Key Error')
      const text = e.message.slice(duplicateTextIndex + duplicateText.length)
      const key = text.replace('"roles_', '').replace('_key"', '')

      const error = new DuplicateUniqueKey(key, data[key as 'name'])

      throw error
    }

    throw error
  }
}

export default createRole
