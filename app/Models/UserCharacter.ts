import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'

import UserCharacterBalance from 'App/Models/UserCharacterBalance'

export default class UserCharacter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'account_id' })
  public accountId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => UserCharacterBalance)
  public balance: HasOne<typeof UserCharacterBalance>
}
