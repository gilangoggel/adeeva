import Transaction from "App/Models/Transaction";
import Tracking from "App/Models/Tracking";
import {TransactionStatus} from "App/Enums/payment-status";
import TransactionRetur from "App/Models/TransactionRetur";


const textmap : Record<TransactionStatus, string> = {
  [TransactionStatus.PAYMENT_CONFIRMED] : "Pembayaran di telah diterima",
  [TransactionStatus.INVALID] : "Pembayaran telah dibatalkan"
} as any

export class TrackingListeners {

  private static make = (transaction: Transaction, message: string) => Tracking.create({
    transactionId: transaction.id,
    text: message
  })

  static onTransactionReturnResended = async (retur : TransactionRetur) => {
    if (! retur.transaction) await retur.load('transaction');
    await TrackingListeners.make(retur.transaction, 'Barang telah dikirim ulang oleh admin adeeva');
  }

  /**
   * Tracking ketika user mengirimkan barang ke adeva
   * @param retur
   */
  static onTransactionReturnSended = async (retur: TransactionRetur) => {
    await retur.load('transaction');
    const message = "Pengembalian barang telah dikirim"
    await TrackingListeners.make(retur.transaction, message)
  }
  /**
   * Tracking ketika admin menyetujui pengembalian barang
   * @param retur
   */
  static onTransactionReturAccepted = async (retur : TransactionRetur) => {
    await retur.load('transaction');
    await Tracking.create({
      transactionId: retur.transactionId,
      text: "Pengembalian barang telah di setujui oleh admin adeeva"
    })
  }
  /**
   * Tracking ketika pengguna mengajukan pengembalian barang
   * @param transaction
   */
  static onTransactionReturCreated = async (transaction: Transaction) => {
    await Tracking.create({
      text: "Anda mengajukan pengembalian barang",
      transactionId: transaction.id
    })
  }
  /**
   * Tracking default ketika pembayaran di verifikasi
   * midtrans
   */
  static onPaymentUpdated = async (meta: Transaction) => {
    await Tracking.create({
      text: textmap[meta.status as any],
      transactionId : meta.id
    })
  }
  /**
   * Tracking default ketika admin / reseller
   * melakukan pengiriman barang
   */
  static onTrackingNumberSubmitted = async (transaction : Transaction, message = "") => {
    const text = message ? message: "Barang dalam proses pengiriman";
    // const find = await Tracking.query()
    //   .where('transaction_id', '=', transaction.id)
    //   .where('text', '=', text)
    const tracking  = await Tracking.create({
      transactionId: transaction.id,
      text: text
    })
    console.log(tracking)
  }
  static onResellerTransactionCreated = async (transaction: Transaction) => {
    return TrackingListeners.onTrackingNumberSubmitted(transaction, 'Order telah diterima oleh reseller kami')
  }
  static onResellerConfirm = async (transaction: Transaction) => {
    await Tracking.create({
      transactionId: transaction.id,
      text : "Order anda akan segera dikirim oleh reseller kami"
    })
  }
  static onResellerCompletion = async (transaction: Transaction) => {
    await Tracking.create({
      text: "Reseller kami telah mengirim order kepada alamat yang anda berikan",
      transactionId : transaction.id
    })
  }
  static onAdminCompletion = async (transaction: Transaction) => {
    await Tracking.create({
      text: "Barang anda telah diterima sesuai dengan tracking expedisi",
      transactionId : transaction.id
    })
  }
  /**
   *
   */
  static onTransactiontionComplete = () => {

  }
}
