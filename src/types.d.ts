export interface SavedUser {
  id: string
  email: string
  username: string
}

export interface SavedRole {
  id: string
  name: string
}

export type EpochTimeStamp = number

export interface EventWrapper<T = any> {
  sent: EpochTimeStamp
  payload: T
}

declare global {
  namespace Express {
    interface Request {
      user?: SavedUser
    }
  }
}
