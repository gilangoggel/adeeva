import User from "App/Models/User";
import voca from 'voca'
import Hash from "@ioc:Adonis/Core/Hash";
import 'minifaker/locales/en';
import { name } from 'minifaker';

export default class GenerateFakeUser{
  protected base : string = "fake-{number}@adeeva.group";

  generate = async (number : number, password: string) => {
    const email = voca(this.base).replaceAll("{number}", number.toString()).value();
    return User.firstOrCreate({
      email
    },{
      email,
      password,
      role: "USER",
      name: name()
    })
  }
  run = async () => {
    const password = await Hash.make("password");
    const arr = Array.from({length:30}).map((_,index)=>index + 1) as number[];
    return Promise.all(
      arr.map((n)=>this.generate(n, password))
    )
  }
  static make = () => {
    const self = new GenerateFakeUser();
    return self.run();
  }
}
