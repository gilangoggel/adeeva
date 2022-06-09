import { Base, HandleSocket, SocketCallback } from './lib/base'
import User from "App/Models/User";
import {Socket} from "socket.io";
import Chat from "App/Models/Chat";
import ChatMessage from "App/Models/ChatMessage";
import { AdminChannel } from './admin-channel'

type RoomDispatcher = {
  socket: Socket,
  roomname: string
  event: string
  data: any
}

function dispatchInRoom({ socket, event, roomname, data  } : RoomDispatcher){
  socket.in(roomname).emit(event,data)
}

export class PersonalChatChannel extends Base {

  namespace = "personal-chat";

  readonly events = ['typing', 'join', 'message', 'leave', 'open', 'all-messages', 'status'] as const;

  private serializeMessages = async (model: ChatMessage) => {
    return model.serialize({
      fields: {
        pick: ['id','message', 'date', 'receiver_name', 'sender_name', 'from', 'to', 'chat_id'],
        omit: ['chat']
      },
    });
  }

  ['all-messages'] : SocketCallback = async ({data, socket}) => {
    if (data.chat_id){
      const chat = await Chat.find(data.chat_id);
      if (chat){
        const { chat_id } = data;
        const messages = await ChatMessage.query().where({chat_id})
          .preload('chat')
          .preload('receiver')
          .preload('sender')
        socket.emit(this.makeNamespace('all-messages'), messages);
      }
    }
  }

  message : SocketCallback = async ({data, socket}) => {
    const { message, chat_id } = data;
    const chat = await Chat.find(chat_id);
    if (! chat){
      return;
    }
    const model = await chat.related('messages').create({
      message,
      from: socket.user.id,
      to: socket.user.id === chat.to ? chat.from : chat.to
    })
    await model.load('chat');
    await model.load('sender');
    await model.load('receiver');
    const payload = await this.serializeMessages(model);
    const room = this.resolveChatRoom(chat_id, true);

    if (! socket.rooms.has(room)){
      this.joinRoom(
        room, socket, true
      )
    }
    this.broadcastInRoom({
      room,
      event : "message",
      data: payload
    })
  }


  typing : SocketCallback = async (props) => {
    const { data, socket } = props;
    const {chat_id} = data
    const chat = await Chat.find(chat_id);
    if (! chat || ! socket.user) return;
    const room = this.resolveChatRoom(chat_id, true);
    if (socket.user && ! socket.rooms.has(room)){
      const chatRoom = this.resolveChatRoom(chat.id);
      socket.join(chatRoom);
    }
    socket.in(room).emit('personal-chat::typing', {
      user: {
        id: socket.user.id,
        name: socket.user.name
      }
    });
  }
  join : SocketCallback = async ({data, socket}) => {
    if (data.user_id === -1){
      const admin = await User.query().where('role', '=', 'ADMINISTRATOR').first();
      if (admin){
        data.user_id = admin.id
      }
    }
    const room = this.joinRoom(this.resolveChatRoom({
      id: data.user_id
    } as any), socket);
    dispatchInRoom({
      socket,
      roomname: room,
      event:`${this.namespace}::join`,
      data: socket.user.serialize()
    })
  }

  leave : SocketCallback = async () => {}

  status : SocketCallback = async ({data: {chat_id}, socket}) => {
    const chat = await Chat.find(chat_id);
    if (chat && socket.user){
      const chatRoom = this.resolveChatRoom(chat.id);
      if (socket.user.role === "ADMINISTRATOR"){
      }
      this.io.to(chatRoom).emit(
        this.makeNamespace('status'),
        {
          id: socket.user.id,
          name: socket.user.name,
          online: true
        }
      )
    }
  }
  private resolveChatRoom = (user: User | number, withNamespace = false) => {
    const base = `room::${typeof user === "object" ? user.id : user}`;
    if (! withNamespace){
      base
    }
    return `${this.namespace}::room::${typeof user === "object" ? user.id : user}`
  }
  open : SocketCallback = async (contract) => {
    const { data , socket } = contract;
    let to = data.to;
    if (! to || ! socket.user){
      return;
    }
    if (to === -1) {
      const admin = await User.FindAdmin();
      if (admin){
        to = admin.id;
      }
    }
    const toUser = await User.find(to);
    if (! toUser) {
      return;
    }
    let chat = await Chat.query().where({
      from: socket.user.id,
      to,
    }).orWhere({
      to: socket.user.id,
      from : to,
    }).first();
    if (! chat){
      chat = await Chat.create({
        from: socket.user.id,
        to,
        receiver_name : toUser.name,
        sender_name: socket.user.name,
      })
    }
    const chatRoom = this.resolveChatRoom(chat.id);
    const roomName = this.joinRoom(chatRoom, socket, true);
    function serialize(model: User){
      return model.serialize({
        fields:{
          pick:['id', 'name']
        }
      })
    }
    if (socket.user.role === "ADMINISTRATOR"){
      await AdminChannel.joinAllRoom(socket)
    }
    this.io.to(roomName).emit(this.makeNamespace('room-created'), {
      chat_id : chat.id,
      sender: serialize(socket.user),
      receiver: serialize(toUser)
    });
    return {
      chat_id : chat.id
    };
  }

  handleSocket : HandleSocket = async ( {context, socket} ) => {
    return context.session.initiate(true).then(()=>{
      return context.auth.authenticate().then(( user )=>{
        socket.user = user;
        return Boolean(user);
      }).catch((e)=> {
        console.log(
          e
        )
        return false
      })
    }).catch((e)=>{
      console.log(e);
      return false;
    })
  }

}
