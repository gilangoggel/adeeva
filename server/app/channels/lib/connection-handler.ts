import { Base } from './base'
import Application from "@ioc:Adonis/Core/Application";
import {Server, Socket} from "socket.io";

const makeContext = (socket: Socket) => {
  return Application.container.use('Adonis/Core/HttpContext').create("wss", {}, socket.request);
}

interface BaseInstanceType{
  new(io: Server): Base
}

export function connectionHandler(classmap : BaseInstanceType[], io: Server) {
  io.on('connection',  (socket)=> {
    const context =  makeContext(socket);
    classmap.forEach(socketClass=>{
      const instance = new socketClass(io);
      instance.events.forEach((item)=>{
        const callback = instance[item];
        const evt = `${instance.namespace}::${item}`;
        socket.on(evt, async (data: any) => {
          console.log(evt);
          if (instance.handleSocket){
            let check = await instance.handleSocket({
              context, socket, data
            });
            if (! check){
              return;
            }
          }
          const returnvalue = callback({context, socket, data});
          if (returnvalue && 'then' in returnvalue){
            returnvalue.then((value)=>{
              if (value){
                socket.emit(evt, value)
                if (socket.user && socket.user.role === "ADMINISTRATOR"){
                }
              }
            })
          }
        })
      })
    })

  })
}
