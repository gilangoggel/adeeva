import {useWebsocket} from "@root/provider/websocket-provider";
import {useCallback, useEffect, useRef} from "react";

type Callback<V> = (v : V) => void

type Ref = Record<string, any>

export function useWsEvent<T extends Ref = Ref >(name: string, callback?: Callback<T>){
  const ws = useWebsocket();
  const callbackRef = useRef<typeof callback>();
  callbackRef.current = callback;
  useEffect(()=>{
    if (callbackRef.current && ws.ws){
      ws.ws.on(name, callbackRef.current);
      return ()=>{
        ws.ws.off(name, callback);
      }
    }
  }, [ws.ws, callback])
  return ((data : any)=>{
    if (ws.ws){
      ws.ws.emit(name, data);
      return;
    }
  })
}
