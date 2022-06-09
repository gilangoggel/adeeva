import { returSchema, sendReturSchema } from 'App/schema/retur'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import TransactionRetur from "App/Models/TransactionRetur";
import Transaction from "App/Models/Transaction";
import {TransactionStatus} from "App/Enums/payment-status";
import {TrackingListeners} from "App/Helper/tracking-listeners";


export default class ReturController{

  sent404Response = (r : HttpContextContract['response'], isTransaction = false) =>{
    return r.abort({
      message: `${isTransaction ? 'Transaction' : 'Trasaction retur'} is not found`
    })
  }

  private findTransaction = async ({params}: HttpContextContract) => {
    return  Transaction.find(params.id);
  }
  private findTransactionRetur = async ({params}: HttpContextContract) => {
    return  TransactionRetur.find(params.id);
  }

  resend = async (ctx: HttpContextContract) => {
    const { request, response, auth } = ctx;
    await auth.authenticate();
    const retur = await this.findTransactionRetur(ctx);
    if (! retur) return this.sent404Response(response);
    const input = await request.validate({
      schema: sendReturSchema
    });
    await retur.load('transaction')
    const transaction = retur.transaction;
    transaction.trackingNumber = input.trackingNumber;
    transaction.expedition = input.expedition;
    retur.hasResended = true;
    await transaction.save();
    await retur.save();
    await TrackingListeners.onTransactionReturnResended(retur);
    return retur.serialize()
  }

  send = async (ctx : HttpContextContract ) => {
    const { request , response } = ctx;
    const retur = await this.findTransactionRetur(ctx);
    if (! retur) return this.sent404Response({response} as any, true)
    const input = await request.validate({
      schema:sendReturSchema
    })
    Object.assign(retur, input);
    await retur?.save();
    await TrackingListeners.onTransactionReturnSended(retur);
    return retur.serialize();
  }

  accept = async ({params, response}: HttpContextContract) => {
    const retur = await TransactionRetur.find(params.id);
    if (! retur) return this.sent404Response(response);
    retur.accepted = true;
    await retur.save();
    await TrackingListeners.onTransactionReturAccepted(retur);
    return retur.serialize();
  }

  store = async ({request, auth, params, response}: HttpContextContract) => {
    await auth.authenticate();
    const transaction = await this.findTransaction({params} as any);
    if (! transaction) return this.sent404Response(response);
    const {photo, reason} = await request.validate({
      schema: returSchema
    });
    transaction.status = TransactionStatus.RETUR;
    await transaction.save();
    const retur = await TransactionRetur.create({
      transactionId: transaction.id,
      reason,
      photo : ""
    })
    const path = `${retur.id}.${photo.extname}`;
    await photo.moveToDisk('retur',{
      name: path
    });
    retur.photo = path;
    await retur.save();
    return retur.serialize();
  }
}
