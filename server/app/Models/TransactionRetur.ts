import { DateTime } from 'luxon'
import {BaseModel, column, BelongsTo, belongsTo, afterCreate, beforeSave} from '@ioc:Adonis/Lucid/Orm'
import Transaction from "App/Models/Transaction";
import {TrackingListeners} from "App/Helper/tracking-listeners";
import Reseller from "App/Models/Reseller";

export default class TransactionRetur extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public transactionId: number
  @column({
    serialize(v){
      return v ? v : ""
    }
  })
  public expedition: string
  @column({
    serialize(v){
      return v ? v : ""
    }
  })
  public trackingNumber: string
  @column()
  public reason: string
  @column({
    serialize(v){
      return Boolean(v)
    },
  })
  public hasResended: boolean
  @column({
    serialize(v){
      return Boolean(v)
    },
  })
  public accepted: boolean
  @column({
    serialize(v){
      return `/uploads/retur/${v}`
    }
  })
  public photo: string
  @belongsTo(()=>Transaction, {
    serializeAs: null
  })
  transaction: BelongsTo<typeof Transaction>
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  static onReturAccepted = async (self : TransactionRetur) =>{
    if(self.$dirty['accepted']){
      await self.load('transaction');
      await Reseller.decreaseResellerBalance(self.transaction);
    }
  }

  @afterCreate()
  static afterCreate = async (self : TransactionRetur) =>{
    await self.load('transaction');
    await TrackingListeners.onTransactionReturCreated(self.transaction);
  }
}
