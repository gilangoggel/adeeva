import SocketIO from '@ioc:Socket.IO'

export class WebSocket{
  dispatchToUser = ( userId:number ,data: any) => {
    const roomid = `/user/${userId}`;
    const io = SocketIO.io().of(`/user/${userId}`);
    io.to(roomid).emit("notification", data);
  }
}
