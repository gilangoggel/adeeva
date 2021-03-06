import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string
  @column()
  public productId: number
  @column()
  public userId: number
  @column()
  public content: string
  @column()
  public rating: number

  @belongsTo(()=>Product, {serializeAs:null})
  product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
