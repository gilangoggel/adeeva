import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { cities } from 'App/Enums/cities'

const cityIds = cities.map((item) => item.city_id)

const common = {
  name: schema.string(),
  address: schema.string(),
  bank: schema.string(),
  cityId: schema.enum(cityIds),
  postalCode: schema.string(),
  shippingCost: schema.number.nullableAndOptional(),
  items: schema.array([rules.minLength(1)]).members(
    schema.object().members({
      productId: schema.number([
        rules.exists({
          column: 'id',
          table: 'products',
        }),
      ]),
      discount: schema.number.nullableAndOptional(),
      amount: schema.number(),
    })
  ),
}

export const viaExpeditionSchema = {
  ...common,
  expedition: schema.string(),
}
export const viaResellerSchema = {
  ...common,
  resellerId: schema.number([
    rules.exists({
      column: 'id',
      table: 'resellers',
    }),
  ]),
}
