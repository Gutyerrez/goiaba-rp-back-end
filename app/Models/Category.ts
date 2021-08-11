import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public name: string

  @column({ columnName: 'display_name' })
  public displayName: string

  @column({ columnName: 'restrict_read' })
  public restrictRead:
  | 'CITIZEN'
  | 'POLICE'
  | 'CRIMINAL'
  | 'VIP'
  | 'SUPPORT'
  | 'ADMINISTRATOR'
  | 'FOUNDER'

  @column({ columnName: 'restrict_read' })
  public restrictWrite:
  | 'CITIZEN'
  | 'POLICE'
  | 'CRIMINAL'
  | 'VIP'
  | 'SUPPORT'
  | 'ADMINISTRATOR'
  | 'FOUNDER'

  @column({ columnName: 'restrict_read' })
  public restrictClose:
  | 'CITIZEN'
  | 'POLICE'
  | 'CRIMINAL'
  | 'VIP'
  | 'SUPPORT'
  | 'ADMINISTRATOR'
  | 'FOUNDER'

  @column({ columnName: 'restrict_read' })
  public restrictReply:
  | 'CITIZEN'
  | 'POLICE'
  | 'CRIMINAL'
  | 'VIP'
  | 'SUPPORT'
  | 'ADMINISTRATOR'
  | 'FOUNDER'

  @column.dateTime({ columnName: 'enabled_at' })
  public enabledAt: DateTime

  @column.dateTime({ columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at' })
  public updatedAt: DateTime
}
