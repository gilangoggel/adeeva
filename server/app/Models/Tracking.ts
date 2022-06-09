import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Tracking extends BaseModel {



  @column({ isPrimary: true })
  public id: number
  @column({
    serializeAs: null
  })
  public transactionId: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs:null })
  public updatedAt: DateTime

  @column()
  public text: string

}
