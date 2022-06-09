import User from "App/Models/User";
import {Socket} from "socket.io";

export async function assignUser(socket : Socket, data: any){
  const identifier = data.user_id;
  if (socket.user) return;
  if (identifier){
    const user = await User.find(identifier);
    if (user)
    socket.user = user;
  }
}
