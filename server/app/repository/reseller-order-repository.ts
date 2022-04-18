import {LucidModel, ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";
import ResellerOrder from "App/Models/ResellerOrder";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {orderValidator, resellerOrderValidator} from 'App/schema/reseller-order'
import {ResellerOrderStatus} from "App/Enums/reseller-order-status";
import Reseller from "App/Models/Reseller";
import User from "App/Models/User";
import { Repository } from './repository'

export class ResellerOrderRepository implements Repository<typeof ResellerOrder>{

  create = async ({request, auth}: HttpContextContract ) => {
    const user = auth.user as User
    const input = await request.validate({
      schema: orderValidator
    })
    const reseller = await Reseller.query().where('user_id', user.id).first() as Reseller;
    const total = input.products.reduce((r, p)=>{
      return r + p .subTotal;
    }, 0)
    const fill = {
      resellerId: reseller.id,
      total,
      extraData: input
    }
    return await ResellerOrder.create(fill)
  }

  query: ModelQueryBuilderContract<typeof ResellerOrder, InstanceType<LucidModel>>;

  params: Record<string, any> = {}

  constructor(params: Record<string, any> ,userid ?: number) {
    this.params = {
      ...params,
      page:params.page ?? 1,
      perPage: params.perPage ?? 10
    }
    if (userid){
      this.query = ResellerOrder
        .query()
        .join("resellers", 'resellers.id', 'reseller_orders.reseller_id')
        .select(['reseller_orders.*'])
        .where('resellers.user_id', userid)
    }else{
      this.query = ResellerOrder.query()
    }
  }
  preload = () => {
    this.query = this.query.preload('reseller', (r)=>r.preload("user"))
    return this;
  }
  paginate = async () => {
    const { page, perPage } = this.params;
    const paginator = await this.query.paginate(page, perPage);
    return paginator.serialize({
      relations: {
        reseller:{
          fields: ['address']
        },
        user: {
          fields: ['name']
        }
      }
    })
  }

  find = async () => {
    const { id } = this.params;
    return  await ResellerOrder.find(id) as ResellerOrder;
  }
  loadProductData = (model: ResellerOrder) => {
    return model.productData()
  }

  updateStatus = async (model: ResellerOrder, request: HttpContextContract['request']) => {
    if (model.status === "pending"){
      const validate = await resellerOrderValidator({request} as any);
      model.merge({
        ...validate,
        status: ResellerOrderStatus.SHIPMENT
      } as any);
      await model.save()
      return model;
    }
    model.status = ResellerOrderStatus.FINISH;
    await model.save()
    return model;
  }

}
