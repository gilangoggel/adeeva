import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Reseller from 'App/Models/Reseller'
import Product from 'App/Models/Product'
import ResellerOrder from 'App/Models/ResellerOrder'

export default class ResellerOrderSeeder extends BaseSeeder {
  public async run() {
    const reseller = await Reseller.query().where('user_id', 4).first()
    const product = await Product.find(1)
    const amount = 5
    await ResellerOrder.create({
      resellerId: reseller?.id,
      //@ts-ignore
      extraData: {
        products: [
          {
            amount,
            id: product?.id as number,
            subTotal: amount * (product?.resellerPrice as number),
            pax: product?.pax as number,
          },
        ],
      } as any,
      total: (product?.resellerPrice ?? 0) * amount,
    })
  }
}
