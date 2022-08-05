import {NotificationContract} from "@ioc:Verful/Notification";
import Transaction from "App/Models/Transaction";

export default abstract class TransactionOrderNotification implements NotificationContract {


  constructor(protected transaction: Transaction) {}

  public via(_) {
    return 'database' as const
  }

  get action(){
    return  "/account?tab=transaction";
  }

  get isReseller() {
    return Boolean(this.transaction.reseller);
  }
}
