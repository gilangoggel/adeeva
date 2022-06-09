import SocketIO from '@ioc:Socket.IO'
import Application from "@ioc:Adonis/Core/Application";
import { connectionHandler } from 'App/channels/lib/connection-handler'
import User from "App/Models/User";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

import { PersonalChatChannel } from "App/channels/personal-chat-channel"
import { AdminChannel } from "App/channels/admin-channel"
import { OnlinePresenceChannel } from "App/channels/online-presence-channel"


SocketIO.afterStart(() => {
  const io = SocketIO.io();
  io.use((socket, next)=>{
    const context = Application.container.use('Adonis/Core/HttpContext').create("wss", {}, socket.request);
    context
      .session
      .initiate(true).then( async ()=>{
        socket.context = context;
        const auth = context.auth.use('web');
        try {
          await auth.check();
          if (auth.user){
            socket.user = auth.user as any;
            return next();
          }
        }catch (e){
          console.log('error : ',e);
          return
        }
    }).catch(error=>{
      console.log(error);
    })
  })
  const classes = [AdminChannel,OnlinePresenceChannel, PersonalChatChannel];
  connectionHandler(classes, io)
});
declare module "socket.io"{
  type A = import('socket.io').Socket;

  export class Socket extends A{
    user : User
    unsublist:string[]
    context : HttpContextContract
  }
}
