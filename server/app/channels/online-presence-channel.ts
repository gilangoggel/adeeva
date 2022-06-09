import { Base, SocketCallback } from './lib/base'

export class OnlinePresenceChannel extends Base {

  namespace = "online-presence";

  events = ['join', 'leave', 'admin-online'] as const;

  join : SocketCallback = async ( {socket} ) => {
    if (socket.user){
      socket.broadcast.emit(this.makeNamespace('join'), {
        id: socket.user.id,
        name: socket.user.name,
        online: true
      });
    }
  }

  leave: SocketCallback = async ({socket}) => {
    if (socket.user){
      socket.broadcast.emit(this.makeNamespace('leave'), {
        id: socket.user.id,
        name: socket.user.name,
        online: false
      });
    }
  }

}
