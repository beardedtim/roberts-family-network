import Log from '@app/monitoring/log'
import { Bus as User } from '@app/domains/users'

const log = Log.child({
  'use-case': 'emit-user-event',
})

const emitUserEvent = async (eventName: User.EVENTS, value?: any) => {
  log.trace({ eventName, value }, 'User Event Being Emitted')

  User.bus.emit(eventName, {
    sent: Date.now(),
    payload: value,
  })
}

export default emitUserEvent
