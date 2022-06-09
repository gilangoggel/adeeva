import {getParent, types} from 'mobx-state-tree'

export const subcriber = types.model({
  id: types.identifierNumber,
  name: types.string,
  online: types.optional(types.boolean, false),
  isSender: types.optional(types.boolean, false),
  isReceiver: types.optional(types.boolean, false),
  isTyping: types.optional(types.boolean, false),
}).actions(self=>({
  setOnline(v: boolean){
    self.online = v;
  },
  setIsTyping(v: boolean){
    self.isTyping = v;
  },
  setIsReceiver(v: boolean){
    self.isReceiver = v;
  }
})).views(self=>({
  uiHandler(){
    const parent = getParent(self, 2) as any;
    if (parent){
      parent.setReceiver(self, false);
    }
  },
}))
