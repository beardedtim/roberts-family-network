import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import readFileAsString from '@app/utils/read-file-as-string'

const initDB = async (sqlFile: string) => {
  Log.trace({ sqlFile }, 'We are going to try to init the database')

  const result = await DB.query(await readFileAsString(sqlFile))
  Log.debug({ result: result.rows }, 'We have ran the file against datbase')

  return result.rows
}

export default initDB
