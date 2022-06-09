import { BaseController } from './base-controller'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {transactionCompletion} from "App/Helper/transaction-functions";

export default class CompletedController extends BaseController {
  getType(): "completed" | "order" | "retur" | "shipment" {
    return 'completed';
  }
  store = async ( context: HttpContextContract ) => {
    return transactionCompletion('reseller', context)
  }

}
