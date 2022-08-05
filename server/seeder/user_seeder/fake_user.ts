import Hash from "@ioc:Adonis/Core/Hash";
import 'minifaker/locales/en';
import { name } from 'minifaker';
import User from "App/Models/User";

let password : string = "";

export type FakerUserData = {
  name: string
  email: string
  password: string
  role: any
  id: number
}

type Args = {
  length: number
  startId: number
  role: string,
  prefix: string,
}

export default  class FakeUser{
  public payloads: any[] = [];

  static fakeResellerArg = async (length) : Promise<Args> => {
    return {
      length,
      startId: (await User.query()).length,
      role: "RESELLER",
      prefix: "reseller"
    }
  }

  static fakeCustomerArg = async (length) : Promise<Args> => {
    return {
      length,
      startId: (await User.query()).length,
      role: "USER",
      prefix: "user"
    }
  }

  run = async ( {length, startId, prefix, role}: Args ) : Promise<FakerUserData[]> => {
    if (! password){
      password = await  Hash.make("password");
    }
    return Array.from({length}).map((_, index)=>({
      name: name(),
      email: `${prefix}-${index+1}@app.com`,
      password,
      role,
      id: (index + startId) + 2
    }))
  };
}
