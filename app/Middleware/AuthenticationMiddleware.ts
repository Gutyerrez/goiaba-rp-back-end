import Env from '@ioc:Adonis/Core/Env'

import { verify } from 'jsonwebtoken'

import { Route } from '@ioc:App/Extensions/Router'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { PUBLIC_ROUTES } from 'App/Extensions/Constants'

import UnauthorizedException from 'App/Exceptions/UnauthorizedException'

export default class AuthenticationMiddleware {
  public handle = async (
    { request }: HttpContextContract,
    next: () => Promise<void>
  ) => {
    const path = request.url()
    const method = request.intended() as 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

    let route: Route | undefined

    if ((route = PUBLIC_ROUTES.find(route =>
      route.path.test(path) && route.methods.includes(method)
    ))) {
      if (!route.authorizationNecessary) {
        return await next()
      }

      const authorization = request.headers().authorization

      if (!authorization || !verify(authorization, Env.get('APP_KEY'))) {
        throw new UnauthorizedException()
      }

      return await next()
    } else {
      const host = request.ip()
      const authorization = request.headers().authorization

      if (!host || !['127.0.0.1'].includes(host) || authorization !== `Bearer ${Env.get('APP_KEY')}`) {
        throw new UnauthorizedException()
      }

      return await next()
    }
  }
}
