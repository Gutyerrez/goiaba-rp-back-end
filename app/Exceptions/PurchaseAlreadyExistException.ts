import { Exception } from '@adonisjs/core/build/standalone'

export default class PurchaseAlreadyExistException extends Exception {
  constructor (
    message: string = 'Purchase already exist',
    status: number = 409
  ) {
    super(message, status)
  }
}
