import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationRequest } from '@ioc:App/Extensions/Authentication'

import JWT from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import Encryption from '@ioc:Adonis/Core/Encryption'

import User from 'App/Models/User'

import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'

export default class AuthenticationController {
  public store = async ({ request }: HttpContextContract) => {
    try {
      if (!request.hasBody()) {
        throw new BadRequestException()
      }

      const { username, password }: AuthenticationRequest = request.body() instanceof Array
        ? request.body()[0]
        : request.body()

      if (!username || !password) {
        throw new BadRequestException(
          'Username or password must be specified'
        )
      }

      const user = await User.findBy('username', username) ?? await User.findBy('email', username)

      if (!user) {
        throw new BadRequestException(
          'User cannot be found'
        )
      }

      if (Encryption.decrypt(user.password) !== password) {
        throw new BadRequestException(
          'Password does not matches'
        )
      }

      return {
        status: 200,
        access_token: {
          type: 'Bearer',
          token: JWT.sign(
            {
              userId: user.id,
            },
            Env.get('APP_KEY')
          ),
        },
      }
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        e.code
      )
    }
  }
}
