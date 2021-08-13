import { Exception } from '@adonisjs/core/build/standalone'

export default class UserNotFoundException extends Exception {
  constructor (
    message: string = 'User not found',
    status: number = 404
  ) {
    super(message, status)
  }
}
