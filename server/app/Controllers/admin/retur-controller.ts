// import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {BackofficeController} from "App/Controllers/interfaces/backoffice-controller";
import Transaction from "App/Models/Transaction";
import {ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";
import {SaveActionArgs} from "App/Utiities/crud-functions";
import { transactionQueries } from 'App/Helper/transaction-functions'

export default class ReturController extends BackofficeController<Transaction>{

  getBase(): string {
    return "admin";
  }

  getBuilder(_: Record<string, any>): ModelQueryBuilderContract<any> {
    return transactionQueries()
      .whereIn("status", ["6"]);
  }

  getEntity(): string {
    return "retur";
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
