import {Socket} from "socket.io";
import User from "App/Models/User";


type UserMap = Map<string, ReturnType<User['serialize']>>

export class LiveChat {
  constructor(
    protected adminmap: UserMap   = new Map(),
    protected usermap : UserMap = new Map()
  ){}
  namespace = (name: string) => {
    return `livechat::${name}`
  }

  private pushUser = (name: 'admin' | 'user', user : User) => {
    const map = name === "admin"? this.adminmap : this.usermap;
    if (!map.has(user.id.toString())){
      map.set(user.id.toString(),user)
    }
    const k = name === "admin" ? 'adminmap': 'usermap';
    this[k] = map;
  }

  register = (socket: Socket, io :any) => {
    const registerNamespace = this.namespace('register');
    socket.on("livechat::admin-online", ()=>{
      if (this.adminmap.size){
        const arr = Array.from(this.adminmap.values())
        const admin = arr[0];
        socket.emit("livechat::admin-online", {
          name: admin.name,
          id: admin.id,
        })
      }
    })
    socket.on('livechat::all_customers', ()=>{
      const arr = Array.from(this.usermap.values());
      socket.emit('livechat::all_customers', !arr.length ? []: arr.map(i=>({
        name: i.name,
        id: i.id
      })))
    })
    socket.on(registerNamespace, async ({user_id}: any)=> {
      const user = await User.find(user_id);
      if (user){
        if (user.role === "ADMINISTRATOR"){
          io.emit('ADMIN_ONLINE',{
            id: user.id,
            name: user.name
          })
          this.pushUser('admin', user);
        }
        if (user.role === "USER"){
          this.pushUser('user', user);
        }
        socket.user = user;
        socket.unsublist = [];
        const room = `/live-chat/${user.id}`;
        socket.join(room);
        console.log(
          room
        )
      }
    })
  }
}
