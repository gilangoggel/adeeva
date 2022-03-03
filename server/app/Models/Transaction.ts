import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Items from './TransactionItem'

export default class Transaction extends BaseModel {
  /**
   * Relasi transaksi dan item transaksi
   */
  @hasMany(() => Items)
  public items: HasMany<typeof Items>
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
  public customerId: number
  @column()
  public cityId: number
  @column()
  public address: string
  @column()
  public name: string
  @column()
  public vac: string
  @column()
  public bank: string
  @column()
  public expedition?: string
  @column()
  public trackingNumber?: string
  @column()
  public resellerId?: number
  @column()
  public postalCode: string
  @column()
  public total: number
  @column()
  public status: number | string
  @column()
  public shippingCost: number
}
