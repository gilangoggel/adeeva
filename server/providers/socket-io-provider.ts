import SocketIO from 'socket.io'
import { ServerContract } from '@ioc:Adonis/Core/Server'
import {ApplicationContract} from "@ioc:Adonis/Core/Application";


class SocketIOInstance{
  private server: ServerContract
  private afterStartCB: () => void
  private ioInstance : SocketIO.Server;


  constructor (Server: ServerContract){
    this.server = Server
  }

  public afterStart (cb: () => void){
    this.afterStartCB = cb
  }
  public start (){
    const socks = new SocketIO.Server(this.server.instance);
    this.ioInstance = socks;
    if (typeof this.afterStartCB === 'function'){
      this.afterStartCB()
    }
    console.log('SocketIO started')
  }
  public io (){
    return this.ioInstance
  }
}

export default class SocketIOProvider {
  constructor (protected app: ApplicationContract) {}
  public static needsApplication = true;
  public boot () {
    this.app.container.withBindings([
      'Adonis/Core/Server'
    ],(server)=>{
      const io = new SocketIOInstance(server);
      this.app.container.bind("Socket.IO", ()=> {
        return io
      })
    })
  }

  public register(){
  }

  public shutdown () {
    // const io = this.app.container.use("Socket.IO") as SocketIOInstance;
    // io.io().close()
  }

  public ready () {
    const io = this.app.container.use("Socket.IO");
    io.start();
  }
}
