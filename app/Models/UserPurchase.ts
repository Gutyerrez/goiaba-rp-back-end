import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserPurchase extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'user_id' })
  public userId: number

  @column()
  public amount: number

  @column()
  public status:
  | 'PENDING'
  | 'CANCELLED'
  | 'PAID'
  | 'COMPLETED'
  | 'CHARGEBACK'
  | 'REFOUNDED'

  @column({ columnName: 'payment_gateway' })
  public paymentGateway:
  | 'MERCADO_PAGO'
  | 'PIC_PAY'
  | 'PAY_PAL'

  @column.dateTime({ columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at' })
  public updatedAt: DateTime
}
