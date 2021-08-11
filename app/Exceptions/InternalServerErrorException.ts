import { Exception } from '@adonisjs/core/build/standalone'

export default class InternalServerErrorException extends Exception {
  constructor(message: string, status: number) {
    super(message, status)
  }
}
