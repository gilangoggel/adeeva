import Reseller from "App/Models/Reseller";
import TransactionItem from "App/Models/TransactionItem";
import Product from "App/Models/Product";
import {chain} from "lodash";
import ResellerProduct from "App/Models/ResellerProduct";

export default class ResellerProductSeeder{

  public make = async (reseller: Reseller ) => {
    const transactionItems = await TransactionItem.query().join('transactions',
      'transactions.id',
      'transaction_items.transaction_id').where("transactions.reseller_id", '=',reseller.id);
    const products = transactionItems.map(item=>item.productId);
    for (let i = 0; i < products.length; i++) {
      const product = await Product.find(products[i]) as Product;
      const counts = chain(transactionItems).filter({
        productId: product.id
      }).sumBy('amount').value() + 30;
      const instance = new ResellerProduct();
      instance.fill({
        resellerId: reseller.id,
        productId: product.id,
        stock: counts
      })
      await instance.save();
    }
  }
  public static run = async () => {
    const resellers = await Reseller.all();
    const self = new ResellerProductSeeder();
    await Promise.all(resellers.map(self.make));
  }

}
