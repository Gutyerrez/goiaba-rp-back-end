import { Exception } from '@adonisjs/core/build/standalone'

export default class UserAlreadyExistException extends Exception {
  constructor (message: string = 'User already exist', status: number = 409) {
    super(message, status)
  }
}
