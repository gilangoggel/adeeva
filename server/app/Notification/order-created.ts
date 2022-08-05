import User from "App/Models/User";
import Transaction from "App/Models/Transaction";
import TransactionCreated from "App/Notifications/TransactionCreated";

export class OrderCreated {
  admin : User
  static run = async ( transaction : Transaction ) => {
    const admin = await User.query().where('role', '=', 'administrator').first();
    if (! admin) return;
    await transaction.load('customer');
    admin.notify(
      new TransactionCreated(transaction)
    )
  }
}
