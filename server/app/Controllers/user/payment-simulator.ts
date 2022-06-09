import {BankTransfer, EMoney, Midtrans} from '../../../lib/midtrans'
import User from "App/Models/User";
import Env from "@ioc:Adonis/Core/Env";

export default class PaymentSimulator{

  commonTestData = async (payment: string) => {
    const user = await User.find(2) as User;
    await user.load('profile');
    const profile = await user.profile;
    return {
      orderId: `${payment}-${new Date().toISOString()}`.split(" ").join("-"),
      echannel: ['bill', 'for', 'order-test-payload'],
      customer: {
        first_name: user.name,
        email: user.email,
        phone: profile.phoneNumber
      },
      shipmentInfo:{
        expedition: 'jne',
        cost:30000
      },
      products : [1,2,3].map(item=>{
        return {
          name: `item ${item}`,
          quantity: 1,
          id: item.toString(),
          price: 45000
        }
      })
    }
  }

  bankTransfer = async (bank: string) => {
    return BankTransfer.initialize({
      bank,
      ...await this.commonTestData(bank)
    });
  }

  emoney = async (type: any) => {
    return EMoney.initialize({
      ...await this.commonTestData(type),
      emoney: type,
      customPayload: {}
    })
  }
  makeMidtrans(){
    return new Midtrans({
      serverKey: Env.get('MIDTRANS_SERVER'),
      clientKey: Env.get('MIDTRANS_CLIENT')
    })
  }
  index = async () => {
    const midtrans = this.makeMidtrans()
    const response = await midtrans.charge(await this.bankTransfer('mandiri'));
    return response
  }
}
