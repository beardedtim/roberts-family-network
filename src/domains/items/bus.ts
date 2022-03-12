import { TypedEmitter } from 'tiny-typed-emitter'
import { EventWrapper, SavedUser } from '@app/types'

/**
 * The events that this bus will emit
 * and that you can listen on
 */
export enum EVENTS {
  CREATED = 'CREATED',
}

export interface EventHandlers {
  CREATED: (event: EventWrapper<SavedUser>) => unknown
}

class ItemsDomainBus extends TypedEmitter<EventHandlers> {
  constructor() {
    super()
  }
}

export const bus = new ItemsDomainBus()
