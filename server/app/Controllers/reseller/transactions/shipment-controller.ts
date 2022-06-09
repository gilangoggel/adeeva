import {BaseController} from "App/Controllers/reseller/transactions/base-controller";

export default class ShipmentController extends BaseController{
  getType(): "completed" | "order" | "retur" | "shipment" {
    return 'shipment';
  }
}
