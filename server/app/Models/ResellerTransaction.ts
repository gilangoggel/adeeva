import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, afterCreate} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";
import Transaction from "App/Models/Transaction";
import Reseller from "App/Models/Reseller";
import {TrackingListeners} from "App/Helper/tracking-listeners";

export default class ResellerTransaction extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @belongsTo(()=>User, {
    localKey: "customer_id", foreignKey: "id"
  })
  customer : BelongsTo<typeof User>
  @belongsTo(()=>Transaction,)
  transaction : BelongsTo<typeof Transaction>
  @belongsTo(()=>Reseller)
  reseller : BelongsTo<typeof Reseller>


  @column()
  resellerId: number
  @column()
  customerId: number
  @column()
  transactionId: number
  @column()
  status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @afterCreate()
  public static async notifyReseller(self: ResellerTransaction){
    await self.load("reseller", (q)=>q.preload("user"))
    await self.load('transaction')
    await TrackingListeners
      .onResellerTransactionCreated(self.transaction)
  }

}
