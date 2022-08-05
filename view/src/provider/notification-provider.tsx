import * as React from 'react';
import { appNotification } from '@stores/app-notification'
import { notificationModel } from '@models/notification'
import {Instance} from "mobx-state-tree";
import {observer} from "mobx-react";
import {createContext, useContext, useEffect} from "react";
import {usePage} from "@inertiajs/inertia-react";

type Notifiable = Instance<typeof notificationModel>;

type UseNotification = [
  {
    items:Notifiable[],
    unread: number
  },
  (notifiable: Notifiable)=>void,
];
const Context = createContext<UseNotification| null>(null);
export function useNotification(){
  return useContext(Context) as UseNotification;
}

export const NotificationProvider = observer( ({children, notifications}: any) => {

  const unread = appNotification.unreadedCount();

  useEffect(()=>{
    appNotification.setItems(notifications);
  }, [notifications]);

  const handler = (notifiable: Notifiable) => {
    console.log(notifiable)
  }
  return (
    <Context.Provider value={[
      {
        items: appNotification.items,
        unread
      },
      handler
    ]}>
      {children}
    </Context.Provider>
  );
});