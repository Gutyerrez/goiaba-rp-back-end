import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Route } from '@ioc:App/Extensions/Route'

export default class AuthenticationMiddleware {
  protected _publicRoutes = [
    {
      path: new RegExp('^[^/]*/$'),
      methods: [ 'GET' ],
    },
  ] as Route[]
  protected _userRoutes = [] as Route[]

  public handle = async (
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) => {
    const path = request.url()

    console.log(`aopa ${path}`)
    console.log(this._publicRoutes.find(route => route.path.test(path)))

    if (this._publicRoutes.find(route => route.path.test(path)) !== undefined) {
      await next()
    } else {
      console.log('não é uma rota publica')

      return response.json({
        status: 401,
        message: 'Access unauthorized',
      })
    }
  }
}
