import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { Exception } from '@adonisjs/core/build/standalone'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public handle = async (exception: Exception, { response }: HttpContextContract) => {
    return response.status(200).json({
      status: exception.status ?? 500,
      message: exception.message ?? 'Internal server error',
    })
  }
}
