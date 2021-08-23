declare module '@ioc:App/Extensions/Authentication' {
  export type AuthenticationRequest = {
    username?: string
    password?: string
  }

  export type AuthenticationResponse = {
    userId: number
  }
}
