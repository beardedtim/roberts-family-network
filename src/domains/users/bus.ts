import { TypedEmitter } from 'tiny-typed-emitter'
import { EventWrapper, SavedUser } from '@app/types'

/**
 * The events that this bus will emit
 * and that you can listen on
 */
export enum EVENTS {
  // Note the KEY = "KEY"
  // this is so that the value is
  // the string and the type is the
  // key. TS does stupid shit with
  // enums and I don't like it
  CREATED = 'CREATED',
}

export interface EventHandlers {
  CREATED: (event: EventWrapper<SavedUser>) => unknown
}

class UserDomainBus extends TypedEmitter<EventHandlers> {
  constructor() {
    super()
  }
}

export const bus = new UserDomainBus()
