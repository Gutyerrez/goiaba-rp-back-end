import { Exception } from '@adonisjs/core/build/standalone'

export default class UnauthorizedException extends Exception {
  constructor (
    message: string = 'Access unauthorized',
    status: number = 401
  ) {
    super(message, status)
  }
}
