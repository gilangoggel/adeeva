import {Socket} from "socket.io";
import User from "App/Models/User";

const NameSpace = (name: string) => `personal-chat::${name}`;

export class PersonalChat {

  onTyping = (socket: Socket) => {
    const name = NameSpace('typing');
    socket.on(name, async (data)=>{
      const {id} = data;
      this.emitOtherRoom(
        socket, name, id,{
          id,
          name: socket.user.name,
          user_id: socket.user.id
        }
      )
    });
  }

  private emitOtherRoom = (socket: Socket , eventName: string, identifier: any, data: any) => {
    return socket.in(
      `/personal-chat/${identifier}`
    ).emit(eventName, data);
  }

  onMessage = (socket: Socket) => {
    const name = NameSpace('incoming-chat');
    socket.on(name, async (data)=>{
      const { id, message } = data as any;
      this.emitOtherRoom(
        socket, name, id,{
          from : socket.user.id,
          to: id,
          name: socket.user.name,
          message,
          id,
          date: new Date().toISOString(),
        }
      )
    });
  }

  onJoin = (socket: Socket) => {
    const name = NameSpace('join');
    socket.on(name, async (data)=>{
      let { id } = data as any;
      if (id === -1){
        const user = await User.query().where('role','=', 'ADMINISTRATOR').first();
        if (user) {
          id = user.id;
        }
      }
      socket.join(`/personal-chat/${socket.user.id}`);
      socket.emit(name, {
        id,
        name : data.name,
        user_id: data.user_id
      });
      this.emitOtherRoom(
        socket, name, id,{
          user_id: socket.user.id,
          name: socket.user.name,
          id
        }
      )
    });
  }

  register = (socket: Socket) => {
    socket.once(NameSpace('open'), async ()=>{
      socket.emit(NameSpace('open'),{
        oke: "open"
      })
      this.onJoin(socket);
      this.onTyping(socket);
      this.onMessage(socket);
    })
  }

}
