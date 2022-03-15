import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedUser } from '@app/types'
import findUserByAttribute from './find-user-by-attribute'

const log = Log.child({
  'use-case': 'update-profile-by-user-id',
})

const updateProfileByUserId = async (
  id: string,
  update: { [x: string]: any }
) => {
  const user = await findUserByAttribute('id', id)

  const profile = Object.assign({}, user.profile, update)

  const { rows } = await DB.query(
    `
    UPDATE
      users
    SET
      profile = $1
    WHERE
      id = $2
    RETURNING
      *
  `,
    [profile, id]
  )

  return rows[0] as SavedUser
}

export default updateProfileByUserId
