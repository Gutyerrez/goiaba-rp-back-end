import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserPurchaseCreationRequest, UserPurchaseSearchRequest } from '@ioc:App/Extensions/UserPurchase'
import { MAX_GUAVA_AMOUNT } from '@ioc:App/Extensions/Constants'

import User from 'App/Models/User'
import UserPurchase from 'App/Models/UserPurchase'

import UserNotFoundException from 'App/Exceptions/UserNotFoundException'
import BadRequestException from 'App/Exceptions/BadRequestException'
import PurchaseNotFoundException from 'App/Exceptions/PurchaseNotFoundException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'

export default class UsersPurchasesController {
  public index = async ({ request }: HttpContextContract) => {
    try {
      const { page } = request.qs() as { page: number }

      const purchases = await UserPurchase.query().paginate(
        page,
        10
      )

      return {
        status: 200,
        purchases,
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
      const { id, userId }: UserPurchaseSearchRequest = params

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

  public store = async ({ request }: HttpContextContract) => {
    try {
      if (!request.hasBody()) {
        throw new BadRequestException()
      }

      const { userId, guavaAmount, paymentGateway, status }: UserPurchaseCreationRequest = request.body()

      if (!userId || !guavaAmount || !paymentGateway || !status) {
        throw new BadRequestException()
      }

      const user = await User.findBy('id', userId)

      if (!user) {
        throw new UserNotFoundException()
      }

      if (guavaAmount <= 0 || guavaAmount >= MAX_GUAVA_AMOUNT || isNaN(guavaAmount)) {
        return new BadRequestException()
      }

      await user.related('purchases').create({
        guavaAmount,
        paymentGateway,
        status,
      })

      switch (paymentGateway) {
        case 'MERCADO_PAGO': break
        case 'PAY_PAL': break
        case 'PIC_PAY': break
      }
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        e.status
      )
    }
  }

  public update = () => {}
}
