export interface SavedUser {
  id: string
  email: string
  username: string
  is_public: boolean
  profile: {
    [x: string]: any
  }
}

export interface SavedRole {
  id: string
  name: string
}

export interface SavedItem {
  id: string
  type: string
  creator_id: string
  data: {
    [x: string]: any
  }
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
      oidc?: any
    }
  }
}
