import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Profile from "App/Models/Profile";
import { validators } from 'App/schema/account'
import User from "App/Models/User";
import {setFileToAttribute} from "App/Helper/file-helpers";
import {transactionQueries} from "App/Helper/transaction-functions";

export default class AccountController {

  private changeProfile = async ({ auth, request  }: HttpContextContract, keys: Array<keyof Profile>) => {
    const profile = await Profile.query()
      .where('user_id', auth.user?.id as any)
      .first() as Profile;
    keys.forEach(item=>{
      const input = request.input(item, profile[item]);
      if (input){
        profile[item as any] = input;
      }
    })
    return profile.save()
  }

  profile = async (props: HttpContextContract) => {
    const { auth, request } = props;
    const user = auth.user as User;
    const name = request.input("name")
    if (name){
      user.name = name;
    }
    console.log(props.request.allFiles())
    await setFileToAttribute(props, {
      key: "picture",
      dir: "user-picture",
      model: user
    })
    await user.save();
  }

  bank = async (props : HttpContextContract) =>{
    return this.changeProfile(props, [
      "bank", "bankHolder", "bankAccount"
    ])
  }
  contact = async (props: HttpContextContract) => {
    return this.changeProfile(props, [
      "address", "phoneNumber", "postalCode", "cityId"
    ])
  }

  update = async (props: HttpContextContract) => {
    const { request, response, auth } = props;
    const t = request.params()['type'];
    await auth.authenticate();
    const validator = validators[t]
    if (t && validator){
      await validator(props);
    }
    const callback = this[t];
    if (callback){
      await callback(props);
    }
    return response.redirect().back();
  }

  private resolveTransactionQuery = async (user: User, r: HttpContextContract['request']) => {
    if ( ! ["transaction", "pending-payment"].includes(r.input("tab", ""))){
      return {}
    }
    return {
      transactions : await transactionQueries().where(
        'customer_id', user.id as any
      ).orderBy('created_at', 'desc')
    }
  }

  account = async ({ inertia, auth, request }: HttpContextContract) => {
    await auth.authenticate();
    const profile = await Profile.query().where('user_id', auth.user?.id as any)
      .preload("user")
      .first();
    if (! profile) return inertia.redirectBack();

    return inertia.render("account", {
      ...await this.resolveTransactionQuery(auth.user as any, request),
      profile: await profile.serialize({
        relations:{
          user:{
            fields:['name', 'email']
          }
        }
      })
    })
  }
}
