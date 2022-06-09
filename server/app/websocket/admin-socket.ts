import {Socket, Server} from "socket.io";
import User from "App/Models/User";
import { assignUser } from './functions/assign-user'

export class AdminSocket{

  constructor(private io: Server) {}


  onUserJoin = (user: any) => {
    this.io.emit('admin::user-join',user);
  }

  register = (socket: Socket) => {
    socket.on("admin::all-users",async (data)=> {
      if (! socket.user){
        await assignUser(socket, data)
      }
      if (socket.user && socket.user.role === "ADMINISTRATOR"){
        const users = await User.query().where('role', '!=', 'ADMINISTRATOR');
        socket.emit("admin::all-users", users.map((item)=>({
          name: item.name,
          id: item.id
        })))
      }
    });
  }
}
