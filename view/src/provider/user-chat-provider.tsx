import {useChatProvider} from "@libs/personal-chat";
import {observer} from "mobx-react";
import {useWsEvent} from "@hooks/use-ws-event";
import {usePage} from "@inertiajs/inertia-react";
import {useEffect} from "react";
import {onPatch} from "mobx-state-tree";
import {contextFactory} from "@utils/context-factory";
import {useAuth} from "@hooks/use-auth";


export const { Hook : useUserChat, HookContext } = contextFactory<()=>void>()

export const UserChatProvider = observer( ({children}: any) => {
  const [ {store}, {openRoom, updateReceiver, updateSender} ] = useChatProvider();
  const emitStatus = useWsEvent('personal-chat::status');
  const callback = (data: any) =>{
    if (store.receiver){
      store.receiver.setOnline(data.online)
      return;
    }
    updateReceiver({
      id: data.id,
      name:data.name,
      isReceiver: true,
      online: data.online
    })
  }
  const { admin } = usePage().props;
  const auth = useAuth();
  useEffect(()=>{
    return onPatch(store, ({value : chat_id, path})=>{
      if (path === "/chat_id" && chat_id){
        emitStatus({
          chat_id
        })
      }
    })
  },[])
  useEffect(()=>{
    if (admin && auth){
      updateSender({id: auth.id, name: auth.name,})
      updateReceiver(admin);
      openRoom();
    }
  },[admin, auth])
  useWsEvent('online-presence::admin-online', callback)
  const onlineEmitter = () => emitStatus({
    chat_id: store.identifier
  })
  return (
    <HookContext.Provider value={onlineEmitter}>
      {children}
    </HookContext.Provider>
  );
});
