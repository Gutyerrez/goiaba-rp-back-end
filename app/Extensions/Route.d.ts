declare module '@ioc:App/Extensions/Route' {
  export type Route = {
    path: RegExp
    methods: ['GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE']
  }
}
