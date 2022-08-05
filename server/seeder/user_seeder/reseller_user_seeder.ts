import FakeUser, {FakerUserData} from './fake_user';
import { cities } from 'App/Enums/cities';
import * as fake from "minifaker";
import 'minifaker/locales/en';

export type FakeResellers = {
  user_id: number
  city_id: any
  address: string
  bank: string
  bankAccount: string
  balance: number
}

type DataType = {
  users: FakerUserData[],
  resellers: FakeResellers[]
}

export class ResellerUserSeeder{

  public run = async () : Promise<DataType> => {
    const userFaker = new FakeUser()
    const userPayloads = await userFaker.run(
      await FakeUser.fakeResellerArg(cities.length)
    );
    const resellers = userPayloads.map(({id}, index) : FakeResellers =>({
      user_id: id,
      city_id: cities[index].city_id,
      address: fake.streetAddress(),
      bank: "MANDIRI",
      bankAccount: fake.creditCardNumber(),
      balance: 0
    }));
    return {
      users: userPayloads,
      resellers
    }
  }

}
