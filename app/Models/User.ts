import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  hasManyThrough,
  HasManyThrough,
} from '@ioc:Adonis/Lucid/Orm'

import UserPurchase from 'App/Models/UserPurchase'
import UserCharacter from 'App/Models/UserCharacter'
import UserCharacterBalance from 'App/Models/UserCharacterBalance'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public level: number

  @column({ columnName: 'online_time' })
  public onlineTime: number

  @column({ columnName: 'guava_points' })
  public guavaPoints: number

  @column({ columnName: 'serial_id' })
  public serialId?: string

  @column({ columnName: 'last_address' })
  public lastAddress?: string

  @column({ columnName: 'last_character_id' })
  public lastCharacterId?: number

  @column({ columnName: 'whitelisted_at' })
  public whitelistedAt?: DateTime

  @hasManyThrough([() => UserCharacterBalance, () => UserCharacter], {
    foreignKey: 'account_id',
    throughForeignKey: 'id',
  })
  public balance: HasManyThrough<typeof UserCharacterBalance>

  @hasMany(() => UserPurchase)
  public purchases: HasMany<typeof UserPurchase>

  @column.dateTime({ columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at' })
  public updatedAt?: DateTime
}
