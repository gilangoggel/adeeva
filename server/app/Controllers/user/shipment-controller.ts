import {initRajaOnkir, RajaonkirApi} from '../../../lib/rajaonkir-api'
import Env from "@ioc:Adonis/Core/Env";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import {sum} from "lodash";

export default class ShipmentController {

  rajaonkir: RajaonkirApi

  constructor() {

  }
  /**
   * Api untuk mendapatkan biaya pengiriman
   */
  cost = async ( {request} : HttpContextContract ) => {
    const rajaonkir = initRajaOnkir({
      apikey: Env.get('RAJA_ONKIR_API')
    })
    const promise = await Promise.all( request.input('products', []).map( async item=>{
      const products = await Product.find(item.id) as Product;
      return products?.weight * item.amount
    }));
    const weight = sum(promise) * 1000
    rajaonkir.cost.prepare({
      destination: {
        cityId: request.input('destination') as any
      },
      origin:{
        cityId: Env.get('ADEEVA_LOCATION')
      },
      weight,
      expedition: request.input('expedition', '')
    })
    return await rajaonkir.cost.check()
  }
}
