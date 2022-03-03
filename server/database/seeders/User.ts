import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

const roles = ['administrator', 'reseller', 'user']

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const password = await Hash.make('password')
    const promise = Promise.all(
      roles.map((role) => {
        return User.create({
          email: `${role}@adeeva.group`,
          password,
          name: `${role} user`,
          role: role.toUpperCase() as any,
        })
      })
    )
    await promise
  }
}
