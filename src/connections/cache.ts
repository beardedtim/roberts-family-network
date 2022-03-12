import Log from '@app/monitoring/log'
import * as redis from 'redis'
import * as SystemWide from '@app/domains/internal/bus'

const log = Log.child({
  connection: 'cache',
})

const cacheClient = redis.createClient({
  url: `redis://${process.env.CACHE_HOST}:${process.env.CACHE_PORT}`,
  password: process.env.CACHE_PASSWORD,
})

export const connect = () => cacheClient.connect()

export const disconnect = () => cacheClient.disconnect()

export const isConnected = () =>
  cacheClient
    .info()
    .then(() => true)
    .catch((err) => {
      log.debug({ err }, 'Error checking cache connection')

      return false
    })

SystemWide.bus
  .once(SystemWide.EVENTS.INIT, async (event) => {
    // Ensure it is connected
    if (!(await isConnected())) {
      log.trace('System Initting and the Cache is not connected. Connecting')
      await connect()
      log.trace('Cache initted')
    }
  })
  .once(SystemWide.EVENTS.EXIT, async ({ payload }) => {
    const { reason } = payload
    log.trace({ reason }, 'Requested to shut down')

    await disconnect()

    log.trace('Cache disconnected')
  })
