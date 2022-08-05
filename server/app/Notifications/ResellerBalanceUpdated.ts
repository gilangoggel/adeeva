import { NotificationContract } from '@ioc:Verful/Notification'
import Transaction from "App/Models/Transaction";

export default class ResellerBalanceUpdated implements NotificationContract {

  constructor(private transaction: Transaction, private isCancel = false) {}

  public via(_) {
    return 'database' as const
  }

  public toDatabase = () => {
    if(this.isCancel){
      return {
        actions: "/reseller/dashboard",
        text:`Transaksi anda dengan nomor ${this.transaction.id} telah dibatalakan oleh admin, saldo anda berkurang`
      }
    }
    return {
      actions: "/reseller/dashboard",
      text:`Transaksi anda dengan nomor ${this.transaction.id} telah berhasil, saldo anda bertambah`
    }
  }

}
