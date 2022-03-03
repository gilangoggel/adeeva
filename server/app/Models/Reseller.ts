import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Reseller extends BaseModel {
  /**
   * Attribute dari relasi database
   */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  /**
   * Attribute dari kolom database
   */
  @column()
  public name: string
  @column()
  public address: string
  @column()
  public user_id: number
  @column()
  public city_id: number
  @column()
  public balance: number
  @column()
  public bank: string
  @column()
  public bankAccount: string
  @column({ isPrimary: true })
  public id: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
