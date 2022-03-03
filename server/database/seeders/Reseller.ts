import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Reseller from 'App/Models/Reseller'
import faker from 'minifaker'
import 'minifaker/locales/en' // the first locale import is set as default

export default class ResellerSeeder extends BaseSeeder {
  public async run() {
    const user = await User.query().where('role', 'RESELLER').first()
    if (user) {
      await Reseller.create({
        address: faker.streetAddress(),
        user_id: user.id,
        bank: 'mandiri',
        bankAccount: faker.creditCardNumber(),
        city_id: 31,
      })
    }
  }
}
