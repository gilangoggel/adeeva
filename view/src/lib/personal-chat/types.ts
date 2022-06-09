export * from './models/type'
import {IChatModel, IMessageModel, ISubriberModel} from "./models/type";
import {SnapshotIn} from "mobx-state-tree";
import { Websocket } from './constants/websocket'

type Value = {
  messages : IMessageModel[]
  store: IChatModel
  ws: Websocket
};

type Action = {
  updateSender(v : SnapshotIn<ISubriberModel>) : void
  updateReceiver(v : SnapshotIn<ISubriberModel>) : void
  emitTyping(): void
  sentMessage(message: string) : void
  openRoom():void
}

export type UseChatProvider = [Value, Action];
