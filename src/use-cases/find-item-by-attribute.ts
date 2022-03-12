import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import { SavedItem } from '@app/types'

const log = Log.child({
  'use-case': 'find-item-by-attribute',
})

const findItemByAttribute = async (attribute: string, value: unknown) => {
  log.trace({ attribute, value }, 'Finding by attribute')

  const { rows } = await DB.query(
    `SELECT
      *
    FROM
      items
    WHERE
      ${attribute} = $1`,
    [value]
  )

  return rows[0] as SavedItem
}

export default findItemByAttribute
