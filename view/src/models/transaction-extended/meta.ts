import {SnapshotIn, types} from 'mobx-state-tree'
import { checkPaymentStatus } from './functions'

const { maybeNull,model, string, identifier, enumeration, number, array, optional, } = types

export enum PaymentType{
  TRANSFER = 'bank_transfer',
  GOPAY = 'gopay',
  SHOPEE = 'shopee',
  ECHANNEL = 'echannel'
}
export enum MetaTransactionStatus{
  PENDING = 'pending',
  SETTELED = 'settlement',
  EXPIRE = 'expire'
}

const vaNumberModel = model({
  bank: string,
  va_number:string
})

const actionModel = model({
  name: string,
  method: string,
  url: string
})

const mappedTransactionType = Object.keys(MetaTransactionStatus).map(item=>{
  // @ts-ignore
  return MetaTransactionStatus[item as any] as string
})

const transactionStatusType = types.enumeration([
  ...mappedTransactionType,
  ''
])

export const metaModel = model({
  aquirer:maybeNull(string),
  actions: array(actionModel),
  bill_key: maybeNull(string),
  biller_code: maybeNull(string),
  gross_amount: string,
  id: identifier,
  merchant_id: string,
  payment_type: enumeration([PaymentType.TRANSFER, PaymentType.GOPAY, PaymentType.SHOPEE, PaymentType.ECHANNEL]),
  transaction_id: number,
  transaction_status: optional(transactionStatusType, ''),
  va_numbers: array(vaNumberModel)
})
  .actions(self=>({
    update(data : Partial<SnapshotIn<typeof self>>){
      Object.assign(self, data);
    }
  })).
  views(self=>({
    checkPaymentStatus: (isAdmin : boolean = false) => {
      return checkPaymentStatus(self, isAdmin)
    },
    get isBankTransfer(){
      return ['echannel', 'bank_transfer'].includes(self.payment_type)
    },
    get isMandiri(){
      return self.payment_type === "echannel";
    },
    get status(){
      if (! self.transaction_status) return MetaTransactionStatus.PENDING
      return self.transaction_status;
    },
    get paymentModeImage(){
      if (['echannel', 'bank_transfer'].includes(self.payment_type)){
        if (this.isMandiri){
          return `/assets/bank-image/mandiri.png`
        }
        const {bank} =self.va_numbers[0];
        return `/assets/bank-image/${bank}.png`
      }
      return `/assets/bank-image/${self.payment_type}.png`;
    },
    get Va(){
      if (this.isMandiri){
        return self.bill_key as string;
      }
      return self.va_numbers[0].va_number;
    },
    get qrcodeLink(){
      if (this.isBankTransfer) return "";
      const find = self.actions.find(item=>{
        return ['generate-qr-code'].includes(item.name)
      })
      return find ? find.url : "";
    },
    get isExpire(){
      return self.transaction_status === MetaTransactionStatus.EXPIRE;
    }
  }))
