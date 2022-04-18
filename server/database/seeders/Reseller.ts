import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Reseller from 'App/Models/Reseller'
import faker from 'minifaker'
import 'minifaker/locales/en' // the first locale import is set as default
import { cities } from 'App/Enums/cities'
import Hash from "@ioc:Adonis/Core/Hash";

export default class ResellerSeeder extends BaseSeeder {
  private makeReseller = async (userId: any, cityId: any) => {
    await Reseller.create({
      address: faker.streetAddress(),
      userId,
      bank: 'mandiri',
      bankAccount: faker.creditCardNumber(),
      cityId,
    })
  }

  public async run() {
    const password = await Hash.make('password')
    const accounts = cities.map( async (item, index)=>{
      const user = await User.create({
        password,
        name: `Reseller ${index}`,
        role: "RESELLER",
        email: `reseller${index}@adeeva.group`
      })
      return this.makeReseller(
        user.id, item.city_id
      )
    })
    await Promise.all(accounts);
  }
}
