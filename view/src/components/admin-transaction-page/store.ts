import {types} from 'mobx-state-tree'
import {transactionModel} from "@models/transaction-extended";
import { ChilProps } from './types'

export const pageStore = types.model({
  transaction: types.maybeNull(transactionModel),
  tab: types.optional(types.string, '')
}).actions(self=>({
  rowHandlers(model: any, tab : string){
    console.log(
      model
    )
    self.tab = tab;
    self.transaction = model
  }
})).views(self=>({
  close(){
    self.rowHandlers(null, "")
  },
  changeTab(v: string){
    self.rowHandlers(self.transaction, v)
  },
  get childprops() : ChilProps {
    return {
      close: this.close,
      transaction : self.transaction as any,
      action: self.tab,
      changeAction: this.changeTab
    }
  }
}))
