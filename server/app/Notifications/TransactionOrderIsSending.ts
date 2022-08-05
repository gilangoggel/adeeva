import TransactionOrderNotification from "App/Notifications/TransactionOrderNotification";

export default class TransactionOrderIsSending extends TransactionOrderNotification{


  public via(_) {
    return 'database' as const
  }

  toDatabase = () => {
    if(this.transaction.reseller){
      return {
        action : this.action,
        text: "Pesanan anda akan segera di kirimkan oleh reseller kami."
      }
    }

    return {
      action : "/account?tab=transaction",
      text: this.isReseller ?
        "Pesanan anda akan segera di kirimkan oleh reseller kami." :
        `Pesanan anda telah dikirim melalui expedisi ${this.transaction.expedition}`
    }
  }
}
