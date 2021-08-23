declare module '@ioc:App/Extensions/Router' {
  export type Route = {
    path: RegExp
    methods: ['GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE']
    authorizationNecessary?: boolean
  }
}
