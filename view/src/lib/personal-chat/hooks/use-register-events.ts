import { Websocket } from '@libs/personal-chat';
import { EventNames } from '../constants/event-names';
import {useEffect} from "react";

export type EventConfig = [EventNames, (args: any)=>void]

export function useRegisterEvents(ws : Websocket, events : EventConfig[] ){
  useEffect(()=>{
    if (ws.ws){
      const cleanups = events.map(item=>{
        const [name, callback] = item;
        ws.ws.on(name, callback);
        return ()=> {
          ws.ws.off(name, callback);
        }
      })
      return ()=> {
        cleanups.forEach((cleanup)=>cleanup())
      }
    }
  },[events, ws.ws])
}
