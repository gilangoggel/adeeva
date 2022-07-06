import { BaseCommand } from '@adonisjs/core/build/standalone'
import GenerateFakeUser from "../seeder/transaction-seeder/generate-fake-user";
import GenerateFakeTransaction from "../seeder/transaction-seeder/generate-fake-transaction";
import GenerateFakeTransactionMeta from "../seeder/transaction-seeder/generate-fake-transaction-meta";
import Transaction from "App/Models/Transaction";
import TransactionMeta from "App/Models/TransactionMeta";
import TransactionItem from "App/Models/TransactionItem";


export default class TransactionSeeder extends BaseCommand {
  public static commandName = 'transaction:seeder'
  public static description = 'Generate transaction data'
  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  private reset = async ()=>{
    await TransactionMeta.query().delete();
    await TransactionItem.query().delete();
    await TransactionMeta.query().delete()
    await Transaction.query().delete();
  }

  private generate = async (transactions: any) => {
    const transactionData = transactions.map(i=>i.transaction)
    await this.reset();
    let transactionItems = [] as any[];
    transactions.forEach(item=>{
      transactionItems = [
        ...transactionItems, ...item.carts
      ]
    })
    await Transaction.createMany(transactionData);
    await TransactionItem.createMany(transactionItems);
    await TransactionMeta.createMany(
      transactions.map(item=>item.meta)
    )
  }

  public async run() {
    const users = await GenerateFakeUser.make()
    let transactions : any[] = [];
    for (const i in users) {
      const user = users[i];
      const faker = new GenerateFakeTransaction(user);
      transactions = [
        ...transactions, ...(await faker.generate())
      ]
    }
    transactions = transactions.map(item=>{
      const meta = new GenerateFakeTransactionMeta(item);
      return {
        ...item,
        meta : meta.generate()
      }
    })
    await this.generate(transactions);
  }
}
