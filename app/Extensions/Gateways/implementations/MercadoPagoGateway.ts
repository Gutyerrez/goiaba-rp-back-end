import mercadopago from 'mercadopago'

import { AbstractGateway } from 'App/Extensions/Gateways/IGateway'

import { Payment } from '@ioc:App/Extensions/MercadoPago'

import UserPurchase from 'App/Models/UserPurchase'
import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'

export class MercadoPagoGateway extends AbstractGateway {
  protected _name = 'MERCADO_PAGO'

  public create = async (
    purchase: UserPurchase
  ) => {
    try {
      const preference = await mercadopago.preferences.create({
        back_urls: {
          success: this.STATUS_URL,
          failure: this.STATUS_URL,
          pending: this.STATUS_URL,
        },
        notification_url: 'https://api.goiabaroleplay.com/notification',
        items: [
          {
            title: 'Goiaba Points',
            unit_price: 1.0,
            quantity: purchase.guavaAmount,
            currency_id: 'BRL',
          },
        ],
      })

      if (preference.status !== 200) {
        throw new BadRequestException()
      }

      return preference.body
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        e.status,
      )
    }
  }

  public update = async (
    purchase: UserPurchase
  ) => {
    try {
      const { body } = await mercadopago.payment.search({
        qs: {
          sort: 'date_created',
          criteria: 'desc',
          external_reference: `PAYMENT_${purchase.id}`,
        },
      })

      if (!body || body.results.length <= 0) {
        throw new BadRequestException()
      }

      const payment = body.results[0] as Payment

      switch (payment.status) {
        case 'pending': {
          break
        }
        case 'approved': {
          purchase.status = 'PAID'

          break
        }
        case 'cancelled': {
          purchase.status = 'CANCELLED'

          break
        }
        case 'refunded': {
          purchase.status = 'REFOUNDED'

          break
        }
        case 'charged_back': {
          purchase.status = 'CHARGEBACK'

          break
        }
        default: {
          return
        }
      }

      await purchase.save()
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        e.status,
      )
    }
  }

  public refund = async (
    purchase: UserPurchase
  ) => {
    try {
      const { body } = await mercadopago.payment.search({
        qs: {
          sort: 'date_created',
          criteria: 'desc',
          external_reference: `PAYMENT_${purchase.id}`,
        },
      })

      if (!body || body.results.length <= 0) {
        throw new BadRequestException()
      }

      const payment = body.results[0] as Payment

      if (payment.status !== 'approved') {
        throw new BadRequestException()
      }

      mercadopago.payment.update({
        id: payment.id,
        status: 'refunded',
      })
    } catch (e) {
      throw new InternalServerErrorException(
        e.message,
        e.status,
      )
    }
  }
}
