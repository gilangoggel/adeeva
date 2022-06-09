import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Reseller from "App/Models/Reseller";
import ResellerTransaction from "App/Models/ResellerTransaction";
import { transactionQueries } from 'App/Helper/transaction-functions'

export abstract class BaseController {

  abstract getType() : 'completed' | 'order' | 'retur' | 'shipment'

  protected resolveStatus = () => {
    const map : Record<ReturnType<BaseController['getType']>, string[]> = {
      completed: [],
      order: ["2","3"],
      retur: [],
      shipment: [
        "3", "4", "5"
      ]
    };
    const get = map[this.getType()];
    return get.length ? get: map.order;
  }

  public index = async (context: HttpContextContract) => {
    const { inertia } = context
    const paginator = await BaseController.transactionQuery(context, this.resolveStatus());
    return inertia.render(
      `reseller.transaction.${this.getType()}`,
      {
        paginator: await paginator.serialize()
      }
    );
  }

  static transactionQuery = async ({auth}: HttpContextContract, statuses: string[]) => {
    await auth.authenticate();
    const reseller = await Reseller.query().where("user_id", (auth.user as any).id).first() as any;
    const refs = await ResellerTransaction.query()
      .where('reseller_id', reseller.id)
    const ids = refs.map(item=>item.transactionId);
    return transactionQueries()
      .whereIn('id', ids)
      .whereIn('status', statuses)
      .paginate(1,10)
  }
}
