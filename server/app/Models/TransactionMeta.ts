import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Transaction from "App/Models/Transaction";

const jsonHelper = {
  prepare(value: any){
    return JSON.stringify(value)
  },
  consume(val){
    if (typeof val === "string"){
      return JSON.parse(val)
    }
    return val;
  }
}

export default class TransactionMeta extends BaseModel {
  @column({ isPrimary: true })
  public id: string
  @column({ columnName: 'transaction_id' })
  public transactionId: string
  @column({ columnName: 'merchant_id' })
  public merchantId: string
  @column({ columnName: 'gross_amount' })
  public grossAmount: string
  @column({ columnName: 'payment_type' })
  public payment_type: string
  @column()
  public aquirer: string
  @column({ columnName: 'bill_key' })
  public billKey: string
  @column({ columnName: 'biller_code' })
  public billerCode: string
  @column({
    columnName: 'va_numbers',
    ...jsonHelper,
  })
  public vaNumbers: Record<string, any>[]
  @column({
    columnName: 'actions',
    ...jsonHelper,
  })
  public actions: Record<string, any>[]

  @column({
    columnName: 'status'
  })
  public transactionStatus: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>Transaction)
  public transaction: BelongsTo<typeof Transaction>

}
