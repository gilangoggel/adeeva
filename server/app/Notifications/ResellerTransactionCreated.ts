import {NotificationContract} from '@ioc:Verful/Notification'
import Transaction from "App/Models/Transaction";

export default class ResellerTransactionCreated implements NotificationContract {

  constructor(protected transaction: Transaction) {}

  public via(_) {
    return 'database' as const
  }
  public toDatabase = () => {
    return {
      text: `Orderan baru oleh pengguna ${this.transaction.customer.name}`,
      action: "/reseller/transaction/order"
    }
  }
}
