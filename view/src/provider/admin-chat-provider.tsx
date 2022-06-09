import { useChatProvider } from '@libs/personal-chat'
import {useWsEvent} from "@hooks/use-ws-event";
import {createContext, useCallback, useContext, useEffect} from "react";
import {usePage} from "@inertiajs/inertia-react";
import {onAction} from "mobx-state-tree";
import {useAuth} from "@hooks/use-auth";
import {observer} from "mobx-react";

type UseAdminChat = (v : "online"| 'offline') => void
const Context= createContext<null| UseAdminChat>(null)
export function useAdminChat(){
  return useContext(Context) as UseAdminChat;
}

export const AdminChatProvider = observer( ({children}: any) => {
  const [ {store, ws}, {updateReceiver} ] = useChatProvider();
  const auth = useAuth();
  const getSubribers = useWsEvent('admin::users', (data)=>{
    store.mergeSubscriber(data as any);
    store.updateSender(auth);
  })
  const dispatchOnlineStatus = useWsEvent('admin::admin-online');
  const dispatchOfflineStatus = useWsEvent('admin::admin-offline');
  const goOffline = useCallback(()=>{
    dispatchOfflineStatus({})
  },[dispatchOfflineStatus]);
  const goOnline = useCallback(()=>{
    dispatchOnlineStatus({})
  },[dispatchOnlineStatus]);
  const context = useCallback((v: 'online' | 'offline') =>{
    return v === "online" ? goOnline() : goOffline()
  },[]);
  useEffect(()=>{
    return onAction(store, ()=>{
      if (! store.chat_id && store.subscribers.size > 2){
        const arr = store.subscriberToArray[0];
        updateReceiver(arr);
      }
    })
  },[]);
  useEffect(()=>{
    ws.reinitiate();
    getSubribers({});
    goOnline();
  },[ws.ws, auth])
  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
});
