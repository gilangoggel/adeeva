import {ChatModel} from './models'
import {useCallback, useEffect, useMemo} from "react";
import {Websocket} from './constants/websocket'
import {EventNames} from './constants/event-names'
import { useRegisterEvents, EventConfig } from './hooks/use-register-events'
import { useOpenRoom } from './hooks/use-open-room'
import { useSendMessage } from './hooks/use-send-message'
import { UseChatProvider } from './types'
import { useWebsocket } from './constants/websocket'
import { onPatch } from 'mobx-state-tree'

export function useChat() : UseChatProvider {
  const main = useWebsocket();
  const ws = useMemo(()=>{
    return main ? main : new Websocket()
  }, [main])
  const store = useMemo(()=>ChatModel.create({
    messages: {},
    subscribers: {}
  }), []);

  useEffect(()=>{
    return onPatch(store, ({path, value : chat_id})=>{
      if (path === "/chat_id" && chat_id){
        ws.ws.emit(EventNames.ALL_MESSAGE, {
          chat_id
        })
        ws.ws.emit(EventNames.STATUS, {
          chat_id
        })
        console.log('called', EventNames.STATUS);
      }
    })
  },[])
  const onRoomCreated = useCallback( (args: any) => {
    store.setChatId(args.chat_id);
    if (store.receiver && args.sender.id === store.receiver.id){
      store.receiver.setOnline(true);
    }
  }, [store]);
  const emitTyping = useCallback( () => {
    if (store.identifier)
    ws.ws.emit(EventNames.TYPING, {
      chat_id: store.identifier
    })
  }, [])

  const events = useMemo<EventConfig[]>(()=>{
    return [
      [EventNames.ROOM_CREATED, onRoomCreated],
      [EventNames.STATUS, store.updateOnline],
      [EventNames.MESSAGE, store.addMessage],
      [EventNames.ALL_MESSAGE, store.addBulkMessage],
      [EventNames.TYPING, store.updateTyping],
    ]
  }, [store])
  useRegisterEvents(ws, events);
  const openRoom = useOpenRoom(ws, store);
  const sendMessage = useSendMessage(ws, store);
  return [
    {messages: store.chatMessage, store, ws},
    {
      emitTyping,
      updateSender: store.updateSender,
      updateReceiver: store.setReceiver,
      sentMessage: sendMessage,
      openRoom,
    }
  ]
}
