import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column, computed} from '@ioc:Adonis/Lucid/Orm'
import { ExpeditionName } from 'App/Enums/expedition-name'
import { ResellerOrderStatus } from 'App/Enums/reseller-order-status'
import Product from 'App/Models/Product'
import Reseller from "App/Models/Reseller";

type ProductMeta = {
  id: number
  amount: number
  subTotal: number
  pax: number
}
type ProductMetaWithProduct = ProductMeta & {
  product: Product
}

type ResellerOrderExtra = {
  products: ProductMeta[]
}

export default class ResellerOrder extends BaseModel {
  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number
  @column({
    columnName: 'extras',
    prepare(v: Record<string, any>) {
      return JSON.stringify(v)
    },
    consume(v) {
      return typeof v === 'string' ? JSON.parse(v) : v
    },
    serializeAs: null,
  })
  private extraData: ResellerOrderExtra
  @column()
  total: number
  @column({
    columnName: "reseller_id",
    serializeAs: "resellerId"
  })
  public resellerId: number
  @column()
  public expedition: ExpeditionName | null
  @column({
    serializeAs: 'deliveryReciptNumber',
  })
  public deliveryReciptNumber: string | null
  @column.dateTime({ autoCreate: true, serializeAs: "createdAt" })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs:"updatedAt" })
  public updatedAt: DateTime
  @column()
  public status: ResellerOrderStatus

  @computed()
  get productIds() {
    return this.extraData.products.map((item) => item.id)
  }
  @computed()
  get productCount() {
    return this.productIds.length
  }
  @computed()
  get productQuantity() {
    return this.extraData.products.reduce((i: number, reducer) => {
      const total = reducer.amount * reducer.pax
      return i + total
    }, 0)
  }

  @belongsTo(()=>Reseller)
  reseller: BelongsTo<typeof Reseller>

  private productDataQuery = async (item: ProductMeta): Promise<ProductMetaWithProduct> => {
    return {
      ...item,
      product: (await Product.find(item.id))?.serialize() as Product,
    }
  }

  public productData = () => {
    const items = this.extraData.products.map(this.productDataQuery)
    return Promise.all(items)
  }
}
