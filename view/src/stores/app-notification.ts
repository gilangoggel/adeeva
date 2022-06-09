import { types } from 'mobx-state-tree'
import { notificationModel } from '@models/notification'

// const ws = io();

const appNotificationModel = types.model({
  items: types.optional(types.array(notificationModel), [])
}).actions(self=>({
  push(data: any){
    if (notificationModel.is(data)){
      self.items.push(data);
    }
  },

  clearUnreaded(){
    self.items.forEach(i=> {
      i.markAsReaded()
    })
  },
})).views(self=>({
  unreadedCount(){
    return self.items.filter(item=>!item.readed).length
  },
  makeAllUnreaded(userid: any){
    self.items.forEach(item=>{
      item.markAsReaded()
    });
    if (userid){
      // ws.emit('clear-notifications', {
      //   user_id: userid
      // });
    }
  }
}))
export const appNotification = appNotificationModel.create({});
