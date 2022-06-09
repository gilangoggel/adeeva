import { io, Socket } from 'socket.io-client'
import { createContext, useContext } from 'react';

export class Websocket {

  ws : Socket = null as unknown as Socket;

  constructor() {
    const ws = io({
      withCredentials: true,
    });
    this.ws = ws
  }


  reinitiate = () => {
    this.ws.close().connect();
  }
}
export const WebsocketContext  = createContext<null| Websocket>(null)
export function useWebsocket(){
  return useContext(WebsocketContext) as Websocket;
}
