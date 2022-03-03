import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class StockTransaction extends BaseModel {
  /**
   * Attribute dari kolom kolom database
   */
  @column({ isPrimary: true })
  public id: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  @column()
  public resellerId: number
  @column()
  public total: number
  @column()
  public shippingCost: number
  @column()
  public received: boolean
  @column()
  public trackingNumber: string
  @column()
  public expedition: string
}
