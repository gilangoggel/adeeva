import { Transaction } from './transaction'
import type { ItemDetail, ShipmentInfo, CustomerDetail, TransactionReturn} from './interfaces'

export type BankTransferPayload = {
  bank_transfer?: {
    bank: string
  }
  echannel?: Record<string, any>
}

type InitializeProps = {
  bank: string
  echannel?: string[],
  products: ItemDetail[],
  orderId: number | string
  shipmentInfo: ShipmentInfo | number
  customer: CustomerDetail
}

type BankTransferReturn = {
  va_numbers: {
    bank: string
    va_number: string
  }
} | {
  bill_key: string
  biller_code: string
}

export class BankTransfer extends Transaction<BankTransferPayload, BankTransferReturn> {
  resolveResponse = (payload: Record<string, any>): TransactionReturn<BankTransferReturn> => {
    return super.resolveCommonData(payload, [
      'bill_key',
      'biller_code',
      'va_numbers',
    ])
  }

  static initialize = ({customer ,bank, orderId, products, shipmentInfo, echannel = []}: InitializeProps) => {
    const instance = new BankTransfer(bank);
    if (instance.isMandiri){
      instance.setEchannel(echannel)
    }
    instance.setOrderId(orderId)
    instance.setItemDetail(products, shipmentInfo)
    instance.setCustomerDetail(customer)
    return instance
  }

  payment_type = "bank_transfer";

  bank: string = "";

  echannel: Record<string, any> = {};

  isMandiri: boolean = false

  constructor(bank: string) {
    super();
    this.bank = bank;
    this.isMandiri = this.bank === "mandiri"
    if (this.isMandiri){
      this.payment_type = "echannel"
    }
  }

  setEchannel = (echannel: string[]) => {
    const obj: Record<string, any> = {};
    if (! echannel.length || echannel.length < 2){
      throw new Error("Minimal array length for echannel is 2")
    }
    echannel.forEach((text, index)=>{
      const key = `bill_info${index+1}`;
      obj[key] = text
    })
    this.echannel = obj;
  }

  setBank = (bank: string) => {
    this.bank = bank;
  }

  otherpayload(): BankTransferPayload {
    if (this.isMandiri){
      const isNotHasKey = Object.keys(this.echannel).length < 2;
      if (isNotHasKey){
        throw new Error("Please provide echannel parameter")
      }
      return {
        echannel: this.echannel
      }
    }
    return {
      bank_transfer:{
        bank: this.bank
      }
    };
  }
}
