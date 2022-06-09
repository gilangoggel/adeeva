// import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {BackofficeController} from "App/Controllers/interfaces/backoffice-controller";
import Transaction from "App/Models/Transaction";
import {ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";
import {SaveActionArgs} from "App/Utiities/crud-functions";
import {transactionQueries} from 'App/Helper/transaction-functions'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {checkoutSchema} from 'App/schema/tracking-schema'
import Tracking from "App/Models/Tracking";

export default class ShipmentController extends BackofficeController<Transaction>{

  pushTracking = async (context: HttpContextContract ) => {
    const inputs = await checkoutSchema(context)
    const model = await Transaction.find(context.request.param("id"))
    if (! model) return context.response.abort({}, 404)
    return await Tracking.create({
      transactionId: model.id,
      text: inputs.text
    });
  }

  getBase(): string {
    return "admin";
  }

  getBuilder(queries: Record<string, any>): ModelQueryBuilderContract<any> {
    console.log(queries);
    return transactionQueries()
      .whereIn("status", ["2", "3", "4"]);
  }

  getEntity(): string {
    return "shipment";
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
