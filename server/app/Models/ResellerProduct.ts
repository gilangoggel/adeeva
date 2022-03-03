import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Reseller from './Reseller'

export default class ResellerProduct extends BaseModel {
  /**
   * Relasi
   */
  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
  @belongsTo(() => Reseller)
  public reseller: BelongsTo<typeof Reseller>
  /**
   * Attribute dari kolom  database
   */
  @column({ isPrimary: true })
  public id: number
  @column()
  public productId: number
  @column()
  public stock: number
  @column()
  public resellerId: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
