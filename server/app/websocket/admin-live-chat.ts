import {Socket} from "socket.io";
import User from "App/Models/User";



export class AdminLiveChat{

  socket: Socket;

  isAdminLive: boolean = false

  users: User[] = []

  constructor() {}

  private makeEventName = (subName: string) => {
    return `admin-live-chat::${subName}`
  }

  adminOnline = (socket: Socket) => {
    const name = this.makeEventName('admin-online');
    socket.on(name, ()=>socket.emit(name, {
      online: this.isAdminLive
    }));
    socket.unsublist.push(name);
  }


  onAdminOnline= (socket : Socket) => {
    const name = this.makeEventName('admin-status');
    socket.on(name,()=>{
      console.log(name)
      socket.emit(name, {
        status: this.isAdminLive
      })
    })
    socket.unsublist.push(name)
  }

  userListener = (socket : Socket) => {


    this.onAdminOnline(socket);
  }

  /**
   * @info
   * admin sections
   */

  getAllUser = (socket: Socket) => {
    const name = this.makeEventName('get-all-user');
    socket.on(name, ()=>{
      const data = this.users.map(item=>({
        id: item.id.toString(),
        name: item.name
      }))
      socket.emit(name, data);
    })
  }

  adminListener = (_socket: Socket) => {
    this.isAdminLive = true;
    this.getAllUser(_socket);
  }


  register = (socket: Socket) => {
    const name = this.makeEventName('register');
    const _name = this.makeEventName('registered');
    socket.once(name,async (userid)=> {
      const user = await User.find(userid);
      if (user){
        socket.unsublist = [];
        socket.user = user;
        if (user.role === "RESELLER") return;

        if (user.role === "ADMINISTRATOR"){
          this.adminListener(socket)
        }
        if (user.role === "USER"){
          this.userListener(socket)
          const check = this.users.find(item=> {
            return item.id === user.id
          });
          if (!check) {
            this.users.push(user)
          }
        }
        socket.emit(_name, {
          oke:'registered'
        })
      }
    });
  }

  events = ( socket: Socket ) => {
    this.register(socket);
    socket.on("disconnect", ()=>{
      if (! socket.user || ! socket.unsublist) return;
      if (socket.user.role === "ADMINISTRATOR"){
        this.isAdminLive = false;
      }
    })
  }
}
