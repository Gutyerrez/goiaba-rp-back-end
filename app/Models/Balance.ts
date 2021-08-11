import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Person from 'App/Models/Person'

export default class Balance extends BaseModel {
  @column({ isPrimary: true })
  public personId: number

  @column()
  public balance: number

  @column.dateTime({ columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at' })
  public updatedAt: DateTime

  @belongsTo(() => Person)
  public person: BelongsTo<typeof Person>
}
