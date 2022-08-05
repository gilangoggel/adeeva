import { DateTime } from 'luxon'
import {BaseModel, column, BelongsTo, belongsTo, computed, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { cities } from 'App/Enums/cities'
import ResellerProduct from "App/Models/ResellerProduct";
import Transaction from "App/Models/Transaction";
import ResellerBalanceUpdated from "App/Notifications/ResellerBalanceUpdated";

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


  static increaseResellerBalance = async (transaction : Transaction) => {
    if (transaction.resellerId){
      await transaction.load("reseller", (p)=>p.preload("user"));
      const { reseller } = transaction;
      reseller.balance += transaction.total;
      await reseller.save();
      reseller.user.notify(new ResellerBalanceUpdated(transaction));
    }
  }
  static decreaseResellerBalance = async ( transaction : Transaction) => {
    if (transaction.resellerId){
      await transaction.load("reseller", (p)=>p.preload("user"));
      const { reseller } = transaction;
      reseller.balance -= transaction.total;
      await reseller.save();
      reseller.user.notify(new ResellerBalanceUpdated(transaction, true));
    }
  }

}
