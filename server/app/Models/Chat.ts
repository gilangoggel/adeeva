import { DateTime } from 'luxon'
import {BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import ChatMessage from "App/Models/ChatMessage";

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public from : number
  @column()
  public to : number
  @column()
  public receiver_name : string
  @column()
  public sender_name : string

  @hasMany(()=>ChatMessage)
  public messages: HasMany<typeof ChatMessage>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
