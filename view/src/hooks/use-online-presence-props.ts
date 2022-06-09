import {UseOnlinePresence} from "@root/provider/online-presence-provider";
import {IChatModel, IChatModelExtended} from "@models/chats/chat";
import {useCallback} from "react";

type OnlineEvents = {
  onJoin(v: any) : void
  onLeave(v: any) : void
  onMounted(v :  UseOnlinePresence) : void
}

export function useOnlinePresenceProps(store: IChatModel | IChatModelExtended) : OnlineEvents {
  const setter = useCallback( (online : boolean) => {
    return ({id}: any) => {
      const isExtended = 'users' in store;
      const entity = isExtended? (store as IChatModelExtended).users.get(id) : store.receiver;
      if (entity){
        entity.setOnline(online);
      }
    }
  }, [])
  const onJoin = setter(true);
  const onLeave = setter(false);
  const onMounted = (v: UseOnlinePresence) => {
    console.log(
      'when mounted', v
    )
  }
  return {
    onJoin,
    onLeave,
    onMounted
  }
}
