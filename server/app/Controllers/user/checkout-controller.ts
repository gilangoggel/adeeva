import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import { checkoutSchema } from 'App/schema/checkout-schema'
import { TrasactionHelper } from 'App/Helper/trasaction-helper'
import {Midtrans} from "../../../lib/midtrans";
import Env from "@ioc:Adonis/Core/Env";

export default class CheckoutController {
  makeMidtrans(){
    return new Midtrans({
      serverKey: Env.get('MIDTRANS_SERVER'),
      clientKey: Env.get('MIDTRANS_CLIENT')
    })
  }

  checkout = async (props: HttpContextContract) => {
    const inputs = await checkoutSchema(props);
    await props.session.forget('transactionId')
    await props.auth.authenticate();
    const helper = new TrasactionHelper(inputs, props.auth.user as any, this.makeMidtrans());
    try {
      const transaction = await helper.run();
      if (transaction){
        await props.session.put('transactionId',transaction.id)
      }
    }catch (e){
      console.log("errors", e);
    }
    return props.response.redirect().back();
  }
}
