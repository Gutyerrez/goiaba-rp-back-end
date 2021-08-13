import { Exception } from '@adonisjs/core/build/standalone'

export default class PurchaseNotFoundException extends Exception {
  constructor (
    message: string = 'Purchase not found',
    status: number = 404
  ) {
    super(message, status)
  }
}
