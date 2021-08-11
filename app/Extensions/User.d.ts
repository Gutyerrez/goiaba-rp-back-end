declare module '@ioc:App/Extensions/User' {
  export type UserCreationRequest = {
    username?: string
    email?: string
    password?: string
    address?: string
    serial_id?: string
  }
}
