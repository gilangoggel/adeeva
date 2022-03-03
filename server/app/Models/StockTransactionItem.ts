import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class StockTransactionItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public transactionId: number
  @column()
  public productId: number
  @column()
  public amount: number
  @column()
  public total: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
