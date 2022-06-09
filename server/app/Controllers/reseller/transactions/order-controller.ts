import { BaseController } from './base-controller'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Transaction from "../../../Models/Transaction";
import {TransactionStatus} from "App/Enums/payment-status";
import {TrackingListeners} from "App/Helper/tracking-listeners";
export default class OrderController extends BaseController{
  getType(): "completed" | "order" | "retur" | "shipment" {
    return 'order';
  }



  update = async ({ params, inertia, auth }: HttpContextContract) => {
    const model = await Transaction.find(
      params.id
    )
    await auth.authenticate();
    if (! model || ! auth.user) {
      return inertia.redirectBack()
    }
    await auth.user.load('reseller');
    if (model.resellerId === auth.user.reseller.id){
      model.status = TransactionStatus.SENDING;
      await model.save();
      await TrackingListeners.onResellerConfirm(model)
    }
    return inertia.redirectBack();
  }
}
