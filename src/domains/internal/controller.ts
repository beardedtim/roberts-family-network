import path from 'path'

import Log from '@app/monitoring/log'
import initDB from '@app/use-cases/init-db'
import runSqlFile from '@app/use-cases/run-sql-file'
import emitSystemWideEvent from '@app/use-cases/emit-system-wide-event'
import generate from '@app/use-cases/generate-qr-code'

import { EVENTS as SystemWideEvents } from './bus'
import { Model } from '@app/domains/users'

const log = Log.child({
  controller: 'internal',
})

export const init = async () => {
  log.trace('Initting the internal system')

  const sqlDir = path.resolve(__dirname, '..', '..', '..', 'sql')

  await emitSystemWideEvent(SystemWideEvents.INIT, {})

  log.trace({ sqlDir }, 'Initting with the following parameters')
  await runSqlFile(`${sqlDir}/init.sql`)
  try {
    await runSqlFile(`${sqlDir}/create-admin.sql`)
  } catch (e) {
    log.warn(
      { err: e },
      'We did not creat admin. This may be because it was already done.'
    )
  }

  try {
    await runSqlFile(`${sqlDir}/create-user-profile.sql`)
  } catch (e) {
    log.warn(
      { err: e },
      'We did not add user profiles. This may be because it was already done.'
    )
  }
}

export const exit = async (reason?: string) => {
  log.trace({ reason }, 'Exiting the system')

  await emitSystemWideEvent(SystemWideEvents.EXIT, { reason })
  log.trace('System exitting')
}

export const generateQRCodeForUser = async (userID: string) => {
  log.trace({ userID }, 'Generating QR code')
  const user = await Model.findById(userID)
  if (!user) {
    throw new TypeError(`User with ID "${userID}" Not Found`)
  }

  const code = await generate(user.username)

  log.trace({ code }, 'Generated QR Code')

  return code
}
