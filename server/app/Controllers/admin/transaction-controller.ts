import {BackofficeController} from "App/Controllers/interfaces/backoffice-controller";
import Transaction from "App/Models/Transaction";
import {ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";
import {SaveActionArgs} from "App/Utiities/crud-functions";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {
  TransactionStatus,
  ResellerTransactionStatus
} from "App/Enums/payment-status";
import ResellerTransaction from "App/Models/ResellerTransaction";
import {TrackingListeners} from "App/Helper/tracking-listeners";
import {transactionCompletion, transactionQueries} from "App/Helper/transaction-functions";

export default class TransactionController extends BackofficeController<Transaction>{


  updateShipment = async ({ request ,inertia ,params: {transaction} }: HttpContextContract) => {
    const model = await Transaction.find(transaction);
    if (model){
      if (! model.resellerId){
        model.status = TransactionStatus.SENDING;
        model.trackingNumber = request.input("trackingNumber");
        await TrackingListeners.onTrackingNumberSubmitted(
          model
        )
      }else{
        model.status = TransactionStatus.RESELLER_NOTIFIED;
        await ResellerTransaction.create({
          transactionId: model.id,
          resellerId: model.resellerId,
          customerId: model.customerId,
          status: ResellerTransactionStatus.WAIT as number
        })
      }
      await model.save();
    }
    return inertia.redirectBack();
  }

  getBase(): string {
    return "admin";
  }

  getBuilder(queries: Record<string, any>): ModelQueryBuilderContract<any> {
    console.log(queries)
    return transactionQueries()
      .whereIn("status", ["3", "4"]);
  }

  getEntity(): string {
    return "transaction";
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

  public completeTransaction = async (ctx : HttpContextContract) => {
    return transactionCompletion('admin', ctx)
  }

}
