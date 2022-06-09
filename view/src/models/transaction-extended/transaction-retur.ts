import {getParent, Instance, types} from 'mobx-state-tree'

export const transactionReturModel = types.model({
  id: types.identifierNumber,
  reason: types.string,
  tracking_number: types.optional(types.string,""),
  expedition: types.optional(types.string, ''),
  accepted: types.optional(types.boolean, false),
  photo: types.string,
  created_at: types.string,
  updated_at: types.string,
  has_resended: types.optional(types.boolean,false),
}).actions(self=>({
  setAttribute(data: Partial<typeof self>){
    Object.assign(self, data)
  }
})).views(self=>({
  accept(){
    self.setAttribute({
      accepted: true
    })
  },
  send(data: Record<'tracking_number'| 'expedition', string>){
    self.setAttribute(data);
  },
  resend(data: Record<'tracking_number'| 'expedition', string>){
    try {
      const parent = getParent(self, 1) as any;
      self.setAttribute({
        has_resended: true
      });
      if (parent){
        parent.setAttribute(data);
      }
    }catch (e){}
  },
}))

export type ITransactionRetur = Instance<typeof transactionReturModel['Type']>;
