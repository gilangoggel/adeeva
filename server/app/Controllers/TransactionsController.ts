import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { viaExpeditionSchema, viaResellerSchema } from 'App/schema/transaction'
import Product from 'App/Models/Product'
import TransactionItems from 'App/Models/TransactionItem'
import Transaction from 'App/Models/Transaction'
import { schema as Schema } from '@ioc:Adonis/Core/Validator'
import faker from 'minifaker'
import { sumBy } from 'lodash'
import ResellerProduct from 'App/Models/ResellerProduct'

type ItemInput = {
  discount?: number
  productId: number
  amount: number
}

export default class TransactionsController {
  /**
   * Method untuk mengambil data ketersediaan produk pada reseller
   */
  public checkProductAvaibility = async ({ request }: HttpContextContract) => {
    const productIds = request.input('products') ?? []
    const resellerId = request.input('reseller_id')
    if (!resellerId) {
      return {
        available: false,
      }
    }
    const query = await ResellerProduct.query()
      .whereIn('product_id', productIds)
      .where('reseller_id', resellerId)
      .where('stock', '>', 0)
    return {
      available: query.length && query.length === productIds.length,
    }
  }
  /**
   * Method untuk menyimpan data transaksi
   */
  public store = async ({ request }: HttpContextContract) => {
    const inputs = await this.validateInput(request)
    const items = (await this.parseItemInput(inputs.items as any)).map(this.createTransactionItem)
    return this.saveTransaction(inputs, items)
  }
  public validateInput = (request: HttpContextContract['request']) => {
    const schema = request.input('resellerId') ? viaResellerSchema : viaExpeditionSchema
    return request.validate({
      schema: Schema.create(schema),
    })
  }
  /**
   * Aplikasi diskon apabila pembelian
   */
  private applyDiscountIf = (_input: ItemInput, _product: Product) => {
    return 0
  }
  private parseItemInput = (input: Array<ItemInput>) => {
    const parse = async (item: ItemInput) => {
      const product = (await Product.find(item.productId)) as Product
      const subTotal = product.price * item.amount
      let total = subTotal
      if (this.applyDiscountIf(item, product)) {
        /**
         */
      }
      return {
        ...item,
        sub_total: subTotal,
        total,
      }
    }
    return Promise.all(input.map(parse))
  }

  private createTransactionItem = (input: Record<string, any>) => {
    const transactionItems = new TransactionItems()
    transactionItems.fill(input)
    return transactionItems
  }

  private saveTransaction = async (
    input: Record<string, any>,
    items: TransactionItems[]
  ): Promise<Transaction> => {
    const transaction = new Transaction()
    let total = sumBy(items, 'total')
    if (input.shippingCost) {
      total = total + input.shippingCost
    }
    transaction.fill({
      ...input,
      total,
      vac: faker.creditCardNumber(),
    } as any)
    await transaction.save()
    const transform = async (item: TransactionItems) => {
      item.transactionId = transaction.id
      await item.save()
      return item
    }
    await Promise.all(items.map(transform))
    return transaction
  }
}
