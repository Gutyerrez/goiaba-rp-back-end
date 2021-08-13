import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserPurchaseCreationRequest } from '@ioc:App/Extensions/UserPurchase'

import UserPurchase from 'App/Models/UserPurchase'

import BadRequestException from 'App/Exceptions/BadRequestException'
import PurchaseNotFoundException from 'App/Exceptions/PurchaseNotFoundException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'

export default class UsersPurchasesController {
  public index = async () => {}

  public show = async ({ params }: HttpContextContract) => {
    try {
      const { id, userId }: UserPurchaseCreationRequest = params

      if (!id && !userId) {
        throw new BadRequestException()
      }

      const purchase = await UserPurchase.findBy(
        'id',
        id
      ) ?? await UserPurchase.findBy(
        'user_id',
        userId
      )

      if (!purchase) {
        throw new PurchaseNotFoundException()
      }

      return {
        status: 200,
        purchase,
      }
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        e.status
      )
    }
  }

  public store = () => {}

  public update = () => {}
}
