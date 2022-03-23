import { TypedEmitter } from 'tiny-typed-emitter'
import { EventWrapper, SavedItem } from '@app/types'

/**
 * The events that this bus will emit
 * and that you can listen on
 */
export enum EVENTS {
  CREATED = 'CREATED',
  DELETED = 'DELETED',
  UPDATED = 'UPDATED',
}

export interface EventHandlers {
  CREATED: (event: EventWrapper<SavedItem>) => unknown
  DELETED: (event: EventWrapper<SavedItem>) => unknown
  UPDATED: (event: EventWrapper<SavedItem>) => unknown
}

class ItemsDomainBus extends TypedEmitter<EventHandlers> {
  constructor() {
    super()
  }
}

export const bus = new ItemsDomainBus()
