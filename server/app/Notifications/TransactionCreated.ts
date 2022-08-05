import { NotificationContract } from '@ioc:Verful/Notification'
import Transaction from "App/Models/Transaction";

export default class TransactionCreated implements NotificationContract {

  constructor(protected transaction: Transaction ){};

  public via(_) {
    return 'database' as const
  }

  public toDatabase = () => {
    return ({
      text: `Transaksi baru oleh ${this.transaction.customer.name}`,
        action: "/admin/order"
    })
  };

}
