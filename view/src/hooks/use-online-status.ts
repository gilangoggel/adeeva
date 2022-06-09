import {useCallback, useEffect} from "react";
import {useWsEvent} from "@hooks/use-ws-event";

enum StatusEvents {
  ONLINE= "online-presence::join",
  OFFLINE= "online-presence::leave",
}

export function useSendOnlineStatus(name: 'online' | 'offline', autorun : boolean = false){
  const dispatchOnline = useWsEvent(name === "online" ? StatusEvents.ONLINE : StatusEvents.OFFLINE);
  const run = useCallback(()=>{
    dispatchOnline({})
  }, []);
  useEffect(()=>{
    if (autorun) {
      run()
    }
  },[autorun])
  return run;
}
export function useOnlineStatus(isOnline = false){
  const dispatchOnline = useSendOnlineStatus('online');
  const dispatchOffline = useSendOnlineStatus('offline');
  useEffect(()=>{
    const cb = isOnline ? dispatchOnline : dispatchOffline;
    cb();
  },[isOnline])
}
