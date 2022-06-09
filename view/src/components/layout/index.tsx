import {observer} from "mobx-react";
import {useGlobalStore} from "@root/provider/globar-store-provider";
import type {ComponentType} from "react";
import {AppMode} from "@stores/global-store";
import {Admin} from './admin'
import {Reseller} from './reseller'
import {User} from './user'
import { useChat, Context as ChatContext, WebsocketContext, Websocket } from '@libs/personal-chat'
import {useEffect, useMemo} from "react";
import { UserChatProvider } from '@root/provider/user-chat-provider'
import {usePage} from "@inertiajs/inertia-react";

const ComponentMap : Record<AppMode, ComponentType<any>> = {
  [AppMode.ADMIN] : Admin,
  [AppMode.RESELLER]: Reseller,
  [AppMode.USER]: User
}

export const  Layout = observer( ({children}: any) => {
  const store = useGlobalStore();
  const loc = window.location.href;
  const chat = useChat()
  const ws = useMemo(()=>{
    return new Websocket()
  },[])

  if (loc.includes('admin') || loc.includes("reseller")){
    const Node = ComponentMap[store.appmode];
    return (
      <WebsocketContext.Provider value={ws}>
        <ChatContext.Provider value={chat}>
          <Node>
            {children}
          </Node>
        </ChatContext.Provider>
      </WebsocketContext.Provider>
    )
  }
  return (
    <WebsocketContext.Provider value={ws}>
      <ChatContext.Provider value={chat}>
        <UserChatProvider>
          <User>
            {children}
          </User>
        </UserChatProvider>
      </ChatContext.Provider>
    </WebsocketContext.Provider>
  );
})
