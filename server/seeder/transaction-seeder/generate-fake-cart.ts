import Product from "App/Models/Product";
import * as fake from 'minifaker';
import { uniqBy } from 'lodash'


export default class GenerateFakeCart{

  protected prepared = false;

  protected allProducts: Product[] = [];

  prepare = async () => {
    this.allProducts = await Product.all();
    this.prepared = true;
  }

  private toTransactionItem = (product: Product) => {
    const amount= fake.number({
      min: 1, max: 3
    })
    const total = amount * product.price;
    return {
      product_id: product.id,
      discount: 0,
      total,
      subTotal: total,
      amount,
    }
  }
  generate = (transactionId: number) => {
    if (! this.prepared) throw new Error('Please call prepare function first');
    const arr = Array.from({length: fake.number({
        min: 3, max: 5
      })}).map(()=>fake.arrayElement(this.allProducts));
    return uniqBy(
      arr, 'id'
    ).map(this.toTransactionItem).map(item=>({
      ...item,
      transactionId,
    }))
  }
}
