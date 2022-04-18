import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import 'minifaker/locales/en'

const roles = ['administrator', 'user'];

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const password = await Hash.make('password')
    await User.query().delete();
    const emails = roles.map(item=> User.create({
      email: `${item}@adeeva.group`,
      password,
      role: item.toUpperCase() as any,
    }))
    await Promise.all(emails);
  }
}
