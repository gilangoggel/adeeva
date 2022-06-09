import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {TransactionStatus} from "App/Enums/payment-status";
import {loadMidtrans} from "App/Utiities/load-midtrans";
import Transaction from "App/Models/Transaction";
import Notification from "App/Models/Notification";

export const checkTransactionStatus = async ({params, inertia}: HttpContextContract) => {
  const transaction = await Transaction.find(params.id);
  if (! transaction){
    return inertia.redirectBack();
  }
  /**
   * Cek transaksi sedang menuggu pembayaran atau tidak
   */
  if ( transaction.status === TransactionStatus.PAYMENT_CONFIRMED ){
    return inertia.redirectBack();
  }
  await transaction.load('meta');
  /**
   * Request status transaksi ke midtrans
   */
  const meta = transaction.meta;
  const {transaction_status} = await loadMidtrans().paymentStatus(transaction.meta.id, transaction.meta.payment_type);
  meta.transactionStatus = transaction_status;
  /**
   * Cek status transksi invalid atau tidak
   * @link : https://api-docs.midtrans.com/#transaction-status
   */
  if (['expire', 'cancel', 'deny'].includes(transaction_status)){
    transaction.status = TransactionStatus.INVALID;
  }
  if (transaction_status === "settlement"){
    transaction.status = TransactionStatus.PAYMENT_CONFIRMED;
    await Notification.create({
      userId: transaction.customerId,
      text : "Pembayaran berhasil diverifikasi",
      readed: false,
      actionLink: `/account?tab=transaction&transaction=${transaction.id}`
    })
  }
  await transaction.save();
  await meta.save();
  return inertia.redirectBack();
}
