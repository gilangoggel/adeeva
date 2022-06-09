import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Transaction from 'App/Models/Transaction'
import Product from "App/Models/Product";

export default class TransactionItem extends BaseModel {
  @belongsTo(() => Transaction)
  public transaction: BelongsTo<typeof Transaction>
  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
  /**
   * Attribute dari kolom database
   */
  @column({ isPrimary: true })
  public id: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  @column()
  public discount: number
  @column()
  public productId: number
  @column()
  public transactionId: number
  @column()
  public total: number
  @column()
  public subTotal: number
  @column()
  public amount: number
}
