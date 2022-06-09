import {BackofficeController} from "App/Controllers/interfaces/backoffice-controller";
import Transaction from "App/Models/Transaction";
import {ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";
import {SaveActionArgs} from "App/Utiities/crud-functions";
import { transactionQueries } from 'App/Helper/transaction-functions'
import { checkTransactionStatus } from '../utility/check-transaction-status'

export default class OrderController extends BackofficeController<Transaction>{

  checkStatus = checkTransactionStatus

  protected cheryPick = Transaction.orderCheryPick;

  getBase(): string {
    return "admin";
  }
  getBuilder(queries: Record<string, any>): ModelQueryBuilderContract<any> {
    console.log(queries)
    return transactionQueries()
      .whereIn("status", ['0','1', '2', "3"]);
  }

  getEntity(): string {
    return "order";
  }

  onDestroy = (identifier: any): Promise<Transaction>=> {
    return Transaction.find(identifier) as any;
  }

  resolveModel(): Transaction {
    return new Transaction();
  }

  save = async ({entity}: SaveActionArgs<Transaction>): Promise<Transaction> => {
    return entity as any;
  }

}
