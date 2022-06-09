import {SnapshotIn, types} from 'mobx-state-tree'
import { subcriber } from './subcriber'
import { ISubriberModel } from './type'
import { message } from './message'
import { keyBy } from 'lodash'

export const chat = types.model({
  id: types.optional(types.number, 0),
  subscribers : types.optional(
    types.map(subcriber), {}),
  messages: types.optional(
    types.map(message), {}),
  /**
   * @todo : Remove after implimentation complete
   */
  chat_id: types.optional(types.number, 0),
})
  .actions(self=>({
    addMessage(data: any){
      self.messages.put(data);
    },
    addBulkMessage(data: any[]){
      const map = keyBy(data, 'id');
      self.messages.merge(map);
    },
    putSubscriber(data : SnapshotIn<typeof subcriber['Type']>){
      self.subscribers.put(data)
    },
    updateOnline(data: SnapshotIn<typeof subcriber['Type']>){
      const find = self.subscribers.get(data.id.toString());
      if (find){
        find.setOnline(true)
      }
    },
    updateSender(sender: any){
      if (sender)
        this.putSubscriber({...sender, isSender: true})
    },
    setReceiver(receiver: any){
      const cleanUpFirst = () => {
        // @ts-ignore
        const current = self.receiver as ISubriberModel;
        if (current){
          current.setIsReceiver(false)
        }
      }
      cleanUpFirst();
      const current = self.subscribers.get(receiver.id);
      if (! current){
        this.putSubscriber({...receiver, isReceiver: true});
        return;
      }
      current.setIsReceiver(true);
    },
    mergeSubscriber(data: SnapshotIn<typeof subcriber['Type'][]>){
      self.subscribers.merge(keyBy(data, 'id'));
    },
    setChatId(id: any){
      self.id = id;
      self.chat_id = id;
    },
  }))
  .views(self=>({
    updateTyping({user : {id}}: any){
      const target = self.subscribers.get(id);
      if (target){
        target.setIsTyping(true);
        setTimeout(()=>{
          target.setIsTyping(false);
        }, 500)
      }
    },

    get identifier(){
      return self.id ? self.id : self.chat_id
    },
    get subscriberToArray() : (typeof subcriber['Type'])[]{
      return Array.from(self.subscribers.values());
    },
    get messagesToArray(){
      return Array.from(self.messages.values());
    },
    get receiver(){
      const find = this.subscriberToArray.find(item=>item.isReceiver);
      return find ? find : null
    },
    get sender(){
      const find = this.subscriberToArray.find(item=>item.isSender);
      return find ? find : null
    },
    get chatMessage() : (typeof message['Type'])[]{
      if (this.sender && this.receiver && this.identifier){
        return this.messagesToArray.filter(item=>{
          const received = [item.from, item.to].includes((this.sender as any).id);
          const sended = [item.from, item.to].includes((this.receiver as any).id);
          return received && sended
        })
      }
      return []
    }

  }))
