import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"userId"})
  public userId: number
  @column({columnName: "city_id", serializeAs:"cityId"})
  public cityId: number
  @column()
  public address:string
  @column({columnName: "phone_number", serializeAs:"phoneNumber"})
  public phoneNumber:string
  @column({columnName: "postal_code", serializeAs:"postalCode"})
  public postalCode:string
  @column()
  public bank?:string
  @column({columnName: "bank_account", serializeAs:"bankAccount"})
  public bankAccount?:string
  @column({columnName: "bank_holder", serializeAs:"bankHolder"})
  public bankHolder?:string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>User)
  public user: BelongsTo<typeof User>

}
