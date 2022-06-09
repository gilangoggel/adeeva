import { DateTime } from 'luxon'
import {BaseModel, column, HasMany, hasMany, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Profile from "App/Models/Profile";
import Transaction from "App/Models/Transaction";
import Reseller from "App/Models/Reseller";
import Notification from "App/Models/Notification";
import Comment from "App/Models/Comment";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public role: 'ADMINISTRATOR' | 'USER' | 'RESELLER'

  @column()
  public name: string

  @column({
    serializeAs: null,
  })
  public password: string

  @column()
  public email: string

  @column({
    serialize(value){
      return ! value ? "" : `/uploads/profile/${value}`
    }
  })

  public picture: string

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime

  @hasOne(()=>Profile)
  public profile: HasOne<typeof Profile>
  @hasMany(()=>Transaction)
  public transactions: HasMany<typeof Transaction>

  @hasOne(()=>Reseller)
  public reseller: HasOne<typeof Reseller>
  @hasMany(()=>Notification)
  public notifications : HasMany<typeof Notification>
  @hasMany(()=>Comment)
  public comments : HasMany<typeof Comment>


  static FindAdmin = () => User.query().where('role', '=', 'ADMINISTRATOR').first();

}
