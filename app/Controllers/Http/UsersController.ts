import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  UserCreationRequest,
  UserInformationsRequest,
  UserUpdateRequest,
} from '@ioc:App/Extensions/User'

import Encryption from '@ioc:Adonis/Core/Encryption'

import User from 'App/Models/User'

import BadRequestException from 'App/Exceptions/BadRequestException'
import UserNotFoundException from 'App/Exceptions/UserNotFoundException'
import UserAlreadyExistException from 'App/Exceptions/UserAlreadyExistException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'

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
      const { userIdEmailOrUsername }: UserInformationsRequest = params

      if (!userIdEmailOrUsername) {
        throw new BadRequestException()
      }

      const user = await User.findBy(
        'id',
        userIdEmailOrUsername
      ) ?? await User.findBy(
        'email',
        userIdEmailOrUsername
      ) ?? await User.findBy(
        'username',
        userIdEmailOrUsername
      )

      if (!user) {
        throw new UserNotFoundException()
      }

      return {
        status: 200,
        user,
      }
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

  public update = async ({
    request,
    params,
  }: HttpContextContract) => {
    try {
      const { userIdEmailOrUsername }: UserInformationsRequest = params

      if (!userIdEmailOrUsername || !request.hasBody()) {
        throw new BadRequestException()
      }

      const user = await User.findBy(
        'id',
        userIdEmailOrUsername
      ) ?? await User.findBy(
        'email',
        userIdEmailOrUsername
      ) ?? await User.findBy(
        'username',
        userIdEmailOrUsername
      )

      if (!user) {
        throw new UserNotFoundException()
      }

      const {
        email,
        password,
        level,
        online_time,
        guava_points,
        serial_id,
        last_address,
        last_person_id,
        whitelisted_at,
      }: UserUpdateRequest = request.body()

      user.email = email ?? user.email
      user.password = password ?? user.password
      user.level = level ?? user.level
      user.onlineTime = online_time ?? user.onlineTime
      user.guavaPoints = guava_points ?? user.guavaPoints
      user.serialId = serial_id ?? user.serialId
      user.lastAddress = last_address ?? user.lastAddress
      user.lastPersonId = last_person_id ?? user.lastPersonId
      user.whitelistedAt = whitelisted_at ?? user.whitelistedAt

      await user.save()

      return { status: 202 }
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        e.status
      )
    }
  }

  public patch = async ({ request, params }: HttpContextContract) => {
    try {
      const { userIdEmailOrUsername }: UserInformationsRequest = params

      if (!userIdEmailOrUsername || !request.hasBody()) {
        throw new BadRequestException()
      }

      const user = await User.findBy(
        'id',
        userIdEmailOrUsername
      ) ?? await User.findBy(
        'email',
        userIdEmailOrUsername
      ) ?? await User.findBy(
        'username',
        userIdEmailOrUsername
      )

      if (!user) {
        throw new UserNotFoundException()
      }

      const {
        email,
        password,
        whitelisted_at,
      }: UserUpdateRequest = request.body()

      user.email = email ?? user.email
      user.password = password ?? user.password
      user.whitelistedAt = whitelisted_at ?? user.whitelistedAt

      await user.save()

      return { status: 202 }
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        e.status
      )
    }
  }
}
