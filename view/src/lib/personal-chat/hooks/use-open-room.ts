import {EventNames} from "../constants/event-names";
import { IChatModel } from '../models/type'
import { Websocket } from '../constants/websocket'
import {useEffect} from "react";
import {autorun} from "mobx";

export function useOpenRoom(ws : Websocket ,store: IChatModel ){
  const openRoom = () => {
    if (store.receiver){
      ws.ws.emit(EventNames.OPEN,{
        to: store.receiver.id
      })
    }
  }
  useEffect(()=>{
    return autorun( ()=>{
      if (store.receiver && store.sender){
        openRoom()
      }
    })
  })
  return openRoom;
}
