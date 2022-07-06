import User from "App/Models/User";
import * as fake from 'minifaker';
import FakeCart from './generate-fake-cart'
import { sumBy } from 'lodash'
import {PaymentStatus} from "App/Enums/payment-status";
import { DateTime } from 'luxon'
import voca from "voca";

let current = 1;

type Data = {
  transaction: Record<string, any>;
  carts: Record<string, any>[]
}

export default class GenerateFakeTransaction{

  constructor(protected user: User) {};

  private common = () => ({
    expedition: "jne",
    cityId: 472,
    address : fake.streetAddress(),
    postalCode:"52419",
    name: this.user.name,
    resellerId: null,
    customerId: this.user.id,
    id: current,
    shippingCost: 15000
  })

  generate = async () => {
    const times = fake.number({
      min: 5, max: 10
    })
    const fakeChart = new FakeCart();
    await fakeChart.prepare();
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);
    const payload : Data[] = [] ;
    for (let i = 0; i < times; i++) {
      const minDate = fake.date({
        from: currentDate,
        to : new Date()
      })
      const carts = fakeChart.generate(current);
      const data = {
        ...this.common(),
        createdAt : DateTime.fromJSDate(minDate),
        total: Number.parseFloat(sumBy(carts, 'total') as any),
        status: PaymentStatus.COMPLETED,
        customs:{
          completedByAdmin: true,
          completedByCustomer: true,
        },
        trackingNumber: voca(fake.uuid.v3.DNS)
          .first(17)
          .replaceAll("-", "").upperCase().value()
      };
      current++;
      payload.push({
        transaction: data,
        carts: carts
      })
    }
    return payload;
  }
}
