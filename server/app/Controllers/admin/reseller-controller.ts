
// noinspection JSUnusedGlobalSymbols

import { BackofficeController, SaveAction } from '../interfaces/backoffice-controller'
import Reseller from 'App/Models/Reseller'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { makeDestroyAction } from 'App/Utiities/crud-functions'
import { resellerSchema, messages } from 'App/schema/reseller'
import User from 'App/Models/User'
import { hash } from 'argon2'
import { cities } from 'App/Enums/cities'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import ResellerOrder from "App/Models/ResellerOrder";
import { resellerOrderValidator } from 'App/schema/reseller-order'
import {ResellerOrderStatus} from "App/Enums/reseller-order-status";

export default class ProductController extends BackofficeController<Reseller> {

  productOrderList =async ({ inertia, params }: HttpContextContract) => {
    const { perPage = 10, page=1 } = params
    const paginate = await ResellerOrder
      .query()
      .preload("reseller", (r)=>{
        return r.preload('user')
      })
      .paginate(page, perPage)
    return inertia.render("admin.reseller.orders", {
      paginator: paginate .serialize({
        relations: {
          reseller:{
            fields: ['address', 'user']
          }
        }
      })
    })
  }

  productOrder = async (props: HttpContextContract) => {
    const inputs = await resellerOrderValidator(props)
    console.log(inputs);
    const model = await ResellerOrder.find(props.params.id)
    model?.merge({...inputs, status: ResellerOrderStatus.SHIPMENT} as any)
    await model?.save();
    return props.inertia.redirectBack();
  }

  resolveModel(): Reseller {
    return new Reseller()
  }

  getSchema = resellerSchema

  protected getMessages = messages

  saveReseller = async (
    { city_id, address, bank, bank_account, user_id }: Record<string, any>,
    reseller: Reseller,
    user?: User
  ) => {
    reseller.fill({
      userId: user ? user.id : user_id ? user_id : reseller.userId,
      address,
      bank,
      bankAccount: bank_account,
      cityId: city_id,
    })
    await reseller.save()
    return reseller
  }
  saveUser = async ({ email, password, name }: Record<string, any>) => {
    if (!email || !password || !name) {
      return
    }
    password = await hash(password)
    return User.create({
      email,
      password,
      role: 'RESELLER',
      name,
    })
  }

  save: SaveAction<Reseller> = async ({ entity, payload }) => {
    const user = await this.saveUser(payload)
    entity = await this.saveReseller(payload, entity, user)
    return entity
  }

  onDestroy = makeDestroyAction<typeof Reseller>({
    model: Reseller,
    isSoftDelete: true,
  })
  getBase(): string {
    return 'admin'
  }
  getEntity(): string {
    return 'reseller'
  }

  private getBaseBuilder() {
    return Reseller
      .query()
      .join('users', 'resellers.user_id', '=', 'users.id').preload('user')
  }

  buildQuery = (query: ModelQueryBuilderContract<any>, name: string, value: any) => {
    if (!value) {
      return query
    }
    switch (name) {
      case 'search': {
        return query.where('users.name', 'like', `%${value}%`)
      }
      case 'city': {
        const find = cities.find((item) => {
          return item.city_id === value || item.city_name.includes(value)
        })
        if (!find) return query
        return query.where('city_id', parseInt(find.city_id))
      }
      default: {
        return query
      }
    }
  }

  buildSort = (
    builder: ModelQueryBuilderContract<any>,
    key: string = 'created_at',
    order: 'ASC' | 'DESC' = 'ASC'
  ) => {
    switch (key) {
      case 'name': {
        return builder.orderBy('users.name', order.toLocaleLowerCase() as any)
      }
      case 'city': {
        return builder.orderBy('resellers.city_id', order.toLocaleLowerCase() as any)
      }
      default:
        return builder.orderBy('resellers.created_at', order.toLocaleLowerCase() as any)
    }
  }

  getBuilder({
    sort = 'created_at',
    direction = 'desc',
    search = '',
    city,
  }: Record<string, any>): ModelQueryBuilderContract<any> {
    let base = this.getBaseBuilder()
    const keys = {
      search,
      city,
    }
    Object.keys(keys).forEach((item) => {
      base = this.buildQuery(base, item, keys[item])
    })
    base = this.buildSort(base, sort, direction)
    return base
  }
}
