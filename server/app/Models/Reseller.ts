import { DateTime } from 'luxon'
import {BaseModel, column, BelongsTo, belongsTo, computed, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { cities } from 'App/Enums/cities'
import ResellerProduct from "App/Models/ResellerProduct";

export default class Reseller extends BaseModel {
  /**
   * Attribute dari kolom database
   */
  @column()
  public address: string
  @column()
  public userId: number
  @column()
  public cityId: number
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
  @computed()
  public get city(): string {
    const check = cities.find((item) => {
      return parseInt(item.city_id) == this.cityId
    })
    if (check) return `${check.type} ${check.city_name}`
    return ''
  }
  /**
   * Attribute dari relasi database
   */
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  /**
   * Attribute dari relasi database
   */
  @hasMany(() => ResellerProduct)
  public productList: HasMany<typeof ResellerProduct>
}
