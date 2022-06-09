import { schames, credentialSchema } from 'App/schema/account'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";


export default class AccountController{

  credential = async ({auth, request}: HttpContextContract) => {
    await auth.authenticate();
    const user = auth.user as User;
    const {email, password} =  await request.validate({
      schema:credentialSchema(user as User)
    });
    user.email = email;
    user.password = await Hash.make(password)
    return {
      user
    }
  }

  profile = async (context: HttpContextContract) => {
    const inputs = await context.request.validate({
      schema: schames.profile
    });
    const user = context.auth.user as User;
    await user.load('profile');
    const { name, phoneNumber, postalCode, cityId, picture, address } = inputs;
    user.name = name;
    Object.assign(user.profile, {
      postalCode,
      cityId : parseInt(cityId),
      phoneNumber,
      address
    })
    if (picture){
      const path = `${user.id}.${picture.extname}`
      await picture.moveToDisk(`profile`, {
        name: path
      });
      user.picture = path;
    }
    await user.save();
    await user.profile.save();
    return {
      user,
      profile : user.profile
    }
  }
}
