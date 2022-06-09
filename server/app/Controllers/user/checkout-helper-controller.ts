/**
 * Controller untuk data yang di butuhkan sebelum checkout
 * untuk menghasilkan transaksi
 */
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import ResellerProduct from "App/Models/ResellerProduct";
import Reseller from "App/Models/Reseller";

export default class CheckoutHelperController {
  private getResellerIds = async ({request}: HttpContextContract) => {
    const productIds = request.input('products', [])
    return ResellerProduct
      .query()
      .where('stock', '!=', 0)
      .whereIn('product_id', productIds)
      .distinct('reseller_id')
  }
  private getResellerList = async (props: HttpContextContract) => {
    const resellers = (await this.getResellerIds(props));
    const resellerIds = resellers.map(item=>{
      return item.resellerId
    });
    const query = await Reseller
      .query()
      .whereIn('id', resellerIds )
      .preload('user')
      .preload('productList', q=>q.where('stock', '!=', 0).preload('product'));
    return query.map(item=>item.serialize({
      fields:['city_id', 'city', 'id' ],
      relations: {
        user:{
          fields: ['name']
        },
        productList:{
          fields: ['stock', 'product_id'],
        }
      }
    })).map(item=>({
      id: item.id,
      name: item.user.name,
      products: item.productList,
      city: item.city,
      cityId: item.city_id
    }))
  }
  /**
   * Api untuk mengambil list data reseller yang menjual produk
   * yang ada di dalam cart pengguna
   * input : productId[]
   * output : reseller[]
   */
  resellerList = async (props : HttpContextContract) => {;
    return {
      resellers: await this.getResellerList(props)
    }
  }
}
