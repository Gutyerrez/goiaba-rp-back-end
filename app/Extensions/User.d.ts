declare module '@ioc:App/Extensions/User' {
  import { DateTime } from 'luxon'

  export type UserCreationRequest = {
    username?: string
    email?: string
    password?: string
    address?: string
    serial_id?: string
  }

  export type UserInformationsRequest = {
    userIdEmailOrUsername?: string
  }

  export type UserUpdateRequest = {
    email?: string
    password?: string
    level?: number
    online_time?: number
    guava_points?: number
    serial_id?: string
    last_address?: string
    last_person_id?: number
    whitelisted_at?: DateTime
  }
}
