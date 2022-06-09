import {Server, Socket} from "socket.io";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

interface WsContract {
  context : HttpContextContract
  socket: Socket
  data: any
}

export type HandleSocket = (context: WsContract) => Promise<boolean>
export type SocketCallback = (context: WsContract) => Promise<Record<string, any> | void> | void

interface ChannelContract{
  io : Server
  namespace: string
  handleSocket?: HandleSocket
}

type BroadcastRoomArg<S extends Base> = {
  room: string
  event: S['events'][number]
  data: Record<string, any>
}

export abstract class Base implements ChannelContract{
  namespace: string;

  constructor(public io: Server) { }

  public events : readonly string [] = [] as const

  joinRoom = (name : string, socket : Socket, withoutNamespace = false) => {
    const roomname = `${this.namespace}::${name}`
    if (withoutNamespace){
      socket.join(`${name}`);
      return name;
    }
    socket.join(`${this.namespace}::${name}`);
    return roomname;
  }

  handleSocket: undefined | HandleSocket = undefined

  readonly makeNamespace = (event: string) => {
    return `${this.namespace}::${event}`;
  }

  broadcastInRoom = ({room, event, data}: BroadcastRoomArg<this>) => {
    const eventName = this.makeNamespace(event);
    this.io.in(room).emit(eventName, data);
  }
}
