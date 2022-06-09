import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import 'minifaker/locales/en';
import User from "App/Models/User";
import { arrayElement, phoneNumber, streetAddress } from 'minifaker'
import { cities } from '../../app/Enums/cities'
import Profile from "App/Models/Profile";

export default class ProfileSeeder extends BaseSeeder {
  public async run () {
    const users = await User.query().where("role", "USER");
    const payload = users.map(item=>{
      const selectedCity = arrayElement(cities);
      return {
        userId: item.id,
        cityId: selectedCity.city_id,
        phoneNumber: phoneNumber(),
        postalCode: selectedCity.postal_code,
        address: streetAddress()
      }
    }).map(item=>Profile.create(item as any))
    await Promise.all(payload)
  }
}
