import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import UserCharacter from 'App/Models/UserCharacter'

export default class UserCharacterBalance extends BaseModel {
  @column({ isPrimary: true })
  public personId: number

  @column()
  public balance: number

  @column.dateTime({ columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at' })
  public updatedAt: DateTime

  @belongsTo(() => UserCharacter)
  public character: BelongsTo<typeof UserCharacter>
}
