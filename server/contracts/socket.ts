declare module '@ioc:Socket.IO' {
  import SocketIO from 'socket.io'
  import { Server } from 'socket.io'
  export function io(): Server
  export function afterStart(cb: () => void): void
}
