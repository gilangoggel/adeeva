import { schema, rules } from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";


const itemSchema = schema.object().members({
  id: schema.number([
    rules.exists({
      column:"id", table: "products"
    })
  ]),
  amount: schema.number([])
})
const expeditionSchema = schema.object([]).members({
  address: schema.string(),
  cityId: schema.string(),
  expedition: schema.string.nullableAndOptional({}),
  postalCode: schema.string(),
  name: schema.string()
})

const base : any = {
  items: schema.array([rules.minLength(1)]).members(itemSchema),
  payment: schema.enum(['bri', 'bca', 'mandiri', 'gopay', 'shopeepay']),
  reseller: schema.number.nullable([
    rules.exists({
      column: "id", table:"resellers"
    })
  ]),
  shipmentCost: schema.number(),
  shipment : expeditionSchema,
}

export function checkoutSchema({request}: HttpContextContract){
  return request.validate({
    schema: schema.create(base)
  })
}
