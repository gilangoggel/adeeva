import {applySnapshot, types} from 'mobx-state-tree';
import {ITransaction, transactionModel} from "@models/transaction-extended";
import axios from 'axios'


const transactionPageModel = types.model({
  items : types.optional(types.array(
    transactionModel
  ), []),
  selected: types.maybeNull(
    types.reference(transactionModel)
  ),
  loaded: types.optional(types.boolean, false),
  pendingOnly: types.optional(types.boolean, false),
  returOnly: types.optional(types.boolean, false)
}).actions(self=>({
  setTransaction(model : ITransaction | null){
    self.selected = model
  },
  setType(pendingOnly: boolean | 'retur'){
    if (typeof pendingOnly === "string" && pendingOnly === "retur"){
      self.returOnly = true;
      return;
    }
    self.returOnly = false;
    self.pendingOnly = pendingOnly as boolean;
  }
})).views(self=>({
  onlyPending(){
    self.setType(true)
  },
  settledOnly(){
    self.setType(false)
  },
  onlyRetur(){
    return self.setType('retur')
  },
  close(){
    self.setTransaction(null)
  },
  prepare(model: ITransaction){
    return ()=>self.setTransaction(model)
  },
  transactions(): ITransaction[] {
    return self.items.slice().filter((item)=>{
      if (self.returOnly){
        console.log(self.returOnly);
        return item.status === "6";
      }
      if (self.pendingOnly){
        return item.status === "0"
      }
      return ["0", '6'].includes(item.status) === false
    });
  }
}));

export const transactionHistory = transactionPageModel.create({});

export async function load(){
  return axios.get('/transaction').then(({data})=>{
    applySnapshot(transactionHistory, {
      items: data,
      loaded: true
    })
  })
}
