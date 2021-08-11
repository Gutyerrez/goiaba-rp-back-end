import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserCreationRequest } from '@ioc:App/Extensions/User'

import Encryption from '@ioc:Adonis/Core/Encryption'

import User from 'App/Models/User'

import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import BadRequestException from 'App/Exceptions/BadRequestException'
import UserAlreadyExistException from 'App/Exceptions/UserAlreadyExistException'

export default class UsersController {
  public index = async ({ request }: HttpContextContract) => {
    try {
      const { page } = request.qs() as { page: number | 1 }

      const users = await User.query().paginate(
        page,
        10
      )

      return {
        status: 200,
        users,
      }
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        e.status
      )
    }
  }

  public show = async ({ params }: HttpContextContract) => {
    try {
      //
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        e.status
      )
    }
  }

  public store = async ({ request }: HttpContextContract) => {
    try {
      if (!request.hasBody()) {
        throw new BadRequestException()
      }

      const { username, email, password, address, serial_id }: UserCreationRequest = request.body()

      if (!username || !password) {
        throw new BadRequestException(
          'Username or password is null'
        )
      }

      var user = await User.findBy('username', username) ?? await User.findBy(
        'email',
        email ?? 'undefined'
      )

      if (user) {
        throw new UserAlreadyExistException()
      }

      user = await User.create({
        username,
        email,
        password: Encryption.encrypt(password),
        lastAddress: address,
        serialId: serial_id,
      })

      return {
        status: 201,
        user,
      }
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        e.status
      )
    }
  }
}
