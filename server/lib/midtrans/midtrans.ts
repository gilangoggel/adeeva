import { CoreApi, Transaction as MidtransTransaction } from 'midtrans-client'
import type { Transaction  } from './transaction/transaction'
import type { TransactionReturn  } from './transaction/interfaces'
import { EMoney } from './transaction/e-money'
import { BankTransfer } from './transaction/bank-transfer'

type Config = {
  serverKey: string
  clientKey: string
  isSanbox ?: boolean
}

export class Midtrans {
  coreApi: CoreApi;
  transaction: MidtransTransaction;

  constructor({serverKey, clientKey , isSanbox = true} : Config) {
    this.coreApi = new CoreApi({
      serverKey, clientKey, isProduction: ! isSanbox
    });
  }

  paymentStatus = (id: string, type : string) => {
    const instance = ['bank_transfer', 'echannel'].includes(type) ? new BankTransfer(type) : new EMoney(type as any)
    return this
      .coreApi
      .transaction
      .status(id)
      .then(instance.resolveResponse)
  }

  charge = (instance : Transaction<any>) : Promise<TransactionReturn<any>> => {
    const payload = instance.getData();
    return this.coreApi.charge(payload)
      .then(instance.resolveResponse)
      .catch(error=>{
        return {
          code: error.httpStatusCode as string,
          message: error.ApiResponse?.status_message as string
        }
      }) as Promise<TransactionReturn>
  }
}
export * from './transaction/bank-transfer'
export * from './transaction/e-money'
