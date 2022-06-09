import {applySnapshot, types} from 'mobx-state-tree';
import {ITransaction, transactionModel} from "@models/transaction-extended";
import axios from 'axios'


export const purchaseHistoryModel = types.model({
  histories : types.optional(types.array(
    transactionModel
  ), []),
  selected: types.maybeNull(
    types.reference(transactionModel)
  ),
  loaded: types.optional(types.boolean, false)
}).actions(self=>({
  setTransaction(model : ITransaction | null){
    self.selected = model
  }
})).views(self=>({
  close(){
    self.setTransaction(null)
  },
  prepare(model: ITransaction){
    return ()=>self.setTransaction(model)
  }
}));

export const purchaseHistory = purchaseHistoryModel.create({});

export function load(){
  if (purchaseHistory.loaded) return;
  return axios.get('/transaction').then(({data})=>{
    applySnapshot(purchaseHistory, {
      histories: data,
      loaded: true
    })
  })
}
