import {Midtrans} from "../../lib/midtrans";
import Env from "@ioc:Adonis/Core/Env";

export function loadMidtrans(){
  return new Midtrans({
    serverKey: Env.get('MIDTRANS_SERVER'),
    clientKey: Env.get('MIDTRANS_CLIENT')
  })
}
