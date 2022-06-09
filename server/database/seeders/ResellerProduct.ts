
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'
import ResellerProduct from 'App/Models/ResellerProduct'

export default class ResellerProductSeeder extends BaseSeeder {
  public async run() {
    const products = await Product.all()

    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      await ResellerProduct.create({
        resellerId: 1,
        productId: product.id,
        stock: 10,
      })
    }
  }
}
