export enum PaymentStatus {
  WAIT_FOR_PAYMENT = '0',
  PAYMENT_CONFIRMED = '1',
  SENDING = '2',
  RECEIVED_TO_CUSTOMER = '3',
  COMPLETED = '4',
  RETUR = '5',
}
export enum TransactionStatus {
  WAIT_FOR_PAYMENT = "0",
  PAYMENT_CONFIRMED = "1",
  RESELLER_NOTIFIED = "2",
  SENDING = "3",
  RECEIVED_TO_CUSTOMER = "4",
  COMPLETED = "5",
  RETUR = "6",
  INVALID = '-1'
}


export enum ResellerTransactionStatus{
  WAIT = 0,
  SHIPPING = 1,
  COMPLETED = 2,
}
export enum MidtransPaymentStatus {
  PENDING = "pending",
  SETTLEMENT = 'settlement',
  CANCEL = 'cancel'
}
