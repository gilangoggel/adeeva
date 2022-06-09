import {Base, HandleSocket, SocketCallback} from './lib/base'
import User from "App/Models/User";
import Chat from "App/Models/Chat";

export class AdminChannel extends Base {

  namespace = "admin";

  readonly events = ['users','admin-online', 'admin-offline'] as const;

  static joinAllRoom = async (socket) => {
    const chats = await Chat.query()
      .where('from', socket.user.id)
      .orWhere('to', socket.user.id)
    chats.forEach(item=>{
      socket.join(
        `personal-chat::room::${item.id}`
      )
    })
  }

  ['admin-online'] : SocketCallback = ({socket}) => {
    if (socket.user && socket.user.role === "ADMINISTRATOR") {
      this.io.emit('online-presence::admin-online', {
        id: socket.user.id,
        name: socket.user.name,
        online:true
      })
    }
  }

  ['admin-offline'] : SocketCallback = ({socket}) => {
    if (socket.user && socket.user.role === "ADMINISTRATOR") {
      this.io.emit('online-presence::admin-online', {
        id: socket.user.id,
        name: socket.user.name,
        online:false
      })
    }
  }

  users : SocketCallback = async (ctx) => {
    const { socket } = ctx;
    if (! socket.user){
      return []
    }
    const users = await User.query()
      .whereNot('id', socket.user.id)
      .where('role', '!=' , 'ADMINISTRATOR');
    return users.map(item => ({
      id: item.id,
      name: item.name
    }));
  }

  enterChat: SocketCallback = async () => {}

  handleSocket : HandleSocket = async ({ socket }) => {
    if (! socket.user || socket.user.role !== "ADMINISTRATOR"){
      socket.disconnect(true);
      return false
    }
    return true;
  }
}
