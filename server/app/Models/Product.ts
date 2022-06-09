import { DateTime } from 'luxon'
import {BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Env from '@ioc:Adonis/Core/Env'
import Comment from "App/Models/Comment";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string
  @column()
  public weight: number
  @column()
  public price: number
  @column({ columnName: 'reseller_price', meta: 'resellerPrice' })
  public resellerPrice: number
  @column()
  public category: string
  @column()
  public description: string
  @column({
    serialize(val: string) {
      if (!val) {
        return ''
      }
      let base = Env.get('HOST')
      if(base !== "localhost"){
        base = "localhost"
      }
      if (Env.get('NODE_ENV') === 'development') {
        base = `http://${base}:${Env.get('PORT')}`
      }
      return `${base}${val}`
    },
  })
  public image: string
  @column.dateTime({ autoCreate: true ,serializeAs:"createdAt" })
  public createdAt: DateTime
  @column.dateTime({serializeAs:null})
  public deletedAt?: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs:"updatedAt" })
  public updatedAt: DateTime
  @column()
  public pax: number

  @hasMany(()=>Comment, {serializeAs:null})
  comments: HasMany<typeof Comment>

}
