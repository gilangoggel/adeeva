import FakeUser, {FakerUserData} from './fake_user';
import { cities } from 'App/Enums/cities';
import * as fake from "minifaker";
import 'minifaker/locales/en';

export type FakeProfile = {
  user_id: number
  city_id: any
  address: string
  phoneNumber: string
  postalCode: string
  bank: string
  bankAccount: string
}

type DataType = {
  users: FakerUserData[],
  profiles: FakeProfile[]
}

export class CustomerUserSeeder{

  public run = async () : Promise<DataType> => {
    const userFaker = new FakeUser()
    const userPayloads = await userFaker.run(
      await FakeUser.fakeCustomerArg(cities.length)
    );
    const profileData = userPayloads.map(({id}, index)=>({
      user_id: id,
      city_id: cities[index].city_id,
      address: fake.streetAddress(),
      phoneNumber: fake.phoneNumber(),
      postalCode: '99351',
      bank: "MANDIRI",
      bankAccount: fake.creditCardNumber()
    }));
    return {
      users: userPayloads,
      profiles: profileData
    }
  }

}
