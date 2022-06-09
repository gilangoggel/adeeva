import User from "App/Models/User";
import Transaction from "App/Models/Transaction";
import Notification from "App/Models/Notification";

export class OrderCreated {
  admin : User
  static run = async ( transaction : Transaction ) => {
    const admin = await User.query().where('role', '=', 'administrator').first();
    if (! admin) return;
    await transaction.load('customer')
    await Notification.create({
      userId: admin.id,
      readed : false,
      text: `Order baru oleh pengguna ${transaction.customer.name}`,
      actionLink: "/admin/order"
    })
  }
}
