import {BaseController} from "App/Controllers/reseller/transactions/base-controller";

export default class ReturController extends BaseController {

  getType(): "completed" | "order" | "retur" | "shipment" {
    return 'retur';
  }

}
