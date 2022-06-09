import {Instance, types} from 'mobx-state-tree';
import voca  from 'voca'
import axios from "axios";
import { makeInertiaRequest } from '@models/transaction-extended/functions'

const {string, model, number, identifier, array, optional} = types;


export function toCamelObject(params: Record<string, any>){
  const keys = Object.keys(params);
  const payload: Record<string, any> = {}
  keys.forEach(item=>{
    const camel = voca(item).camelCase().value();
    payload[camel] = params[item] ?? ""
  })
  return payload;
}

const vaNumber = model({
  bank: string,
  va_number: string
}).views(self=>({
  get imgUrl(){
    return `/assets/bank-image/${self.bank}.png`
  }
}))
const actions = model({
  name: string,
  method: string,
  url : string,
})

axios.defaults.withCredentials = true;

const notificationTypeMap : Record<string, Record<'type'| 'message', string>> = {
  pending: {
    type: "default",
    message: "Anda belum melakukan pembayaran"
  },
  settlement: {
    type: "success",
    message: "Transaksi anda berhasil"
  },
  cancel:{
    type: "error",
    message: "Transaksi anda telah di batalkan"
  }

}

export async function  updateStore(store:ITransaction){
  return makeInertiaRequest({
    method: "get",
    url : `/transaction/${store.id}`,
  })
}

const optionalBoolean = types.optional(types.boolean, false)

export const transactionModel = model({
  id: identifier,
  completedByCustomer: optionalBoolean,
  completedByAdmin: optionalBoolean,
  completedByReseller: optionalBoolean,
  aquirer: string,
  transactionId: number,
  billKey: string,
  billerCode: string,
  grossAmount: string,
  merchantId: string,
  paymentType: string,
  vaNumbers:array(vaNumber),
  actions:optional(array(actions), []),
  createdAt: string,
  updatedAt:string,
  transactionStatus: string,
}).actions(self=>({
  updateStatus(status: string){
    self.transactionStatus = status;
  }
})).views(self=>({
  check(){
    return updateStore(self as any)
  }
}))

export type ITransaction = Instance<typeof transactionModel['Type']>
