import Log from '@app/monitoring/log'
import DB from '@app/connections/database'
import readFileAsString from '@app/utils/read-file-as-string'

const initDB = async (sqlDir: string) => {
  Log.trace({ sqlDir }, 'We are going to try to init the database')

  const result = await DB.query(await readFileAsString(`${sqlDir}/init.sql`))
  Log.debug({ result: result.rows }, 'We have inited the datbase')

  return result.rows
}

export default initDB
