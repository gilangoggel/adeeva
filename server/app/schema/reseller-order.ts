import {rules, schema} from "@ioc:Adonis/Core/Validator";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export const resellerOrderMessages = {
  'expedition.required':"Silahkan pilih expedisi pengiriman",
  'deliveryReciptNumber.required':"Silahkan masukan nomor resi pengiriman"
}

export const acceptSchema = schema.create({
  expedition: schema.string(),
  deliveryReciptNumber: schema.string({}, [
    rules.regex(new RegExp('^[0-9]+$'))
  ])
})

const orderItemSchema = schema.object().members({
  id: schema.number([
    rules.exists({
      table: "products",
      column: "id"
    })
  ]),
  pax: schema.number(),
  subTotal: schema.number(),
  amount: schema.number()
})

export const orderValidator = schema.create({
  products: schema.array().members(orderItemSchema)
})

export function resellerOrderValidator({ request }: HttpContextContract){
  return request.validate({
    schema: acceptSchema, messages: resellerOrderMessages
  })
}
