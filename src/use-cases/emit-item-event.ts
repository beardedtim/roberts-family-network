import Log from '@app/monitoring/log'
import { Bus as Items } from '@app/domains/items'

const log = Log.child({
  'use-case': 'emit-item-event',
})

const emitItemEvent = async (eventName: Items.EVENTS, value?: any) => {
  log.trace({ eventName, value }, 'Items Event Being Emitted')

  Items.bus.emit(eventName, {
    sent: Date.now(),
    payload: value,
  })
}

export default emitItemEvent
