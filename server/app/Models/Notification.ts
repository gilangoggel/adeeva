import { DateTime } from 'luxon'
import {afterCreate, BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import {WebSocket} from "../websocket/web-socket";

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column({
    serializeAs: null
  })
  public userId: number
  @column()
  public text: string
  @column({
    serialize(v){
      return Boolean(v)
    }
  })
  public readed: boolean
  @column()
  public actionLink: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @afterCreate()
  static dispatchNotification = async (self: Notification) => {
    const instance = new WebSocket()
    instance.dispatchToUser(
      self.userId, self.serialize()
    )
  }
}
