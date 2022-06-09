import {getParent, Instance, types} from 'mobx-state-tree'
import { chatDataModel } from './chat-data'
import { keyBy } from 'lodash'

export const user = types.model({
  id: types.identifierNumber,
  name: types.string,
  online: types.optional(types.boolean, false)
}).actions(self=>({
  setOnline(v: boolean){
    self.online = v;
  }
})).views(self=>({
  get uiHandler(){
    return () => {
      const parent = getParent(self,2) as any;
      if (parent){
        parent.setReceiver(self)
      }
    }
  }
}))
export const ChatModel = types.model({
  sender: user,
  receiver: types.maybeNull(user),
  messages: types.optional(types.map(chatDataModel),{}),
  chat_id: types.maybeNull(types.number),
}).actions(self=>({
  setReceiver(data:any){
    self.receiver = data
  },
  addMessage(data: any){
    console.log(data);
    self.messages.put(data);
  },
  setChatId(id: number){
    self.chat_id = id
  },
  addBulkMessages(data: any[]){
    const items = keyBy(data, 'id');
    self.messages.merge(items);
  }
})).views(self=>({
  chats(){
    return Array.from(self.messages.values())
  },
  selfMessages(){
    return this.chats().filter(item=>{
      return [item.to, item.from].includes(self.sender.id)
    })
  },
  roomChats(){
    return this.selfMessages().filter(item=>{
      if (! self.receiver){
        return false
      }
      return [item.to, item.from].includes(self.receiver.id)
    })
  }
}));
export const ChatModelExtended = types.compose(ChatModel, types.model({
  receiver: types.maybeNull(
    types.reference(user)
  ),
  users: types.optional(types.map(user),{}),
})).actions(self=>({
  setUsers(data: any){
    self.users.merge(
      keyBy(data, 'id')
    )
  },
}))

export type IChatModel = Instance<typeof ChatModel['Type']>;
export type IChatModelExtended = Instance<typeof ChatModelExtended['Type']>;
export type IChatParticipant = Instance<typeof user['Type']>;
