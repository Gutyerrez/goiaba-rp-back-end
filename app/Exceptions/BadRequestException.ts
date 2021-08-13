import { Exception } from '@adonisjs/core/build/standalone'

export default class BadRequestException extends Exception {
  constructor (
    message: string = 'Body cannot be null',
    status: number = 400
  ) {
    super(message, status)
  }
}
