import { Repository } from './repository'
import Reseller from "App/Models/Reseller";
import {LucidModel, ModelQueryBuilderContract} from '@ioc:Adonis/Lucid/Orm';
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export class ResellerRepository implements Repository<typeof Reseller>{

  params: Record<string, any>;
  query: ModelQueryBuilderContract<typeof Reseller, InstanceType<LucidModel>>;


  constructor(params: Record<string, any>) {
    this.params = params;
  }

  async findByUserId(auth: HttpContextContract['auth']){
    return await Reseller.findBy('user_id', (auth.user as User).id) as Reseller
  }

}
