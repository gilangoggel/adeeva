import { types } from 'mobx-state-tree'
import { notificationModel } from '@models/notification'

// const ws = io();

const appNotificationModel = types.model({
  notifications: types.optional(types.map(notificationModel), {}),
})
  .views(self=>({
    get items(){
      return Array.from(self.notifications.values());
    },
    unreadedCount(){
      return this.items.filter(item=>!item.read).length
    },
    makeAllUnreaded(userid: any){
      this.items.forEach(item=>{
        item.markAsReaded()
      });
      if (userid){
        // ws.emit('clear-notifications', {
        //   user_id: userid
        // });
      }
    }
  })).actions(self=>({
    push(data: any){
      if (notificationModel.is(data)){
        // self.items.push(data);
      }
    },
    clear(){
      self.notifications.clear();
    },
    setItems(items: any){
      console.log('notifications');
      self.notifications.merge(items);
    },
    clearUnreaded(){
      self.items.forEach(i=> {
        i.markAsReaded()
      })
    },
  }))
export const appNotification = appNotificationModel.create({});
