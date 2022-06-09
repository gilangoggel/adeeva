import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, computed} from '@ioc:Adonis/Lucid/Orm'
import Chat from "App/Models/Chat";
import User from "App/Models/User";

export default class ChatMessage extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public chatId: number
  @column()
  public message: string
  @column()
  from : number
  @column()
  to : number
  @belongsTo(()=>User, {serializeAs: null, localKey: "id", foreignKey:"from"})
  sender: BelongsTo<typeof User>
  @belongsTo(()=>User, {serializeAs: null, localKey: "id", foreignKey:"to"})
  receiver: BelongsTo<typeof User>
  @belongsTo(()=>Chat, {serializeAs: null})
  chat: BelongsTo<typeof Chat>
  @computed()
  get receiver_name(){
    if (! this.receiver){
      return "-";
    }
    return this.receiver.name
  }
  @computed()
  get sender_name(){
    if (! this.sender){
      return "-";
    }
    return this.sender.name
  }
  @computed()
  get date(){
    return this.createdAt.toISO()
  }
  @column.dateTime({ autoCreate: true, serializeAs:null })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
