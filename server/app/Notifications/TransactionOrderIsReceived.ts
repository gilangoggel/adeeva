import TransactionOrderNotification from "App/Notifications/TransactionOrderNotification";

export default class TransactionOrderIsReceived extends TransactionOrderNotification{
  public via(_) {

    return 'database' as const
  }
  public toDatabase = () => {
    if (this.isReseller){
      return {
        text: "Reseller kami telah dikirim ke alamat yang anda berikan",
        action : this.action
      }
    }
    return {
      text: "Barang anda telah sampai ke alamat anda",
      action : this.action
    }
  }

}
