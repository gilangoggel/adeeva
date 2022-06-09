import { Websocket } from '../constants/websocket'
import { IChatModel } from '../models/type'
import { EventNames } from '../constants/event-names'
import {useCallback} from "react";

export function useSendMessage( ws: Websocket, store : IChatModel ){
  const sendMessage = useCallback( (message: string) => {
    if (store.identifier){
      ws.ws.emit(
        EventNames.MESSAGE,
        {
          chat_id: store.identifier,
          message
        }
      )
    }
  },[store])
  return sendMessage;
}
