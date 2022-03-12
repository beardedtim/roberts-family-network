import Log from '@app/monitoring/log'
import { Bus as SystemWide } from '@app/domains/internal'

const log = Log.child({
  'use-case': 'emit-system-wide-event',
})

const emitSystemWideEvent = async (
  eventName: SystemWide.EVENTS,
  value?: any
) => {
  log.trace({ eventName, value }, 'System Wide Event Being Emitted')

  SystemWide.bus.emit(eventName, {
    sent: Date.now(),
    payload: value,
  })
}

export default emitSystemWideEvent
