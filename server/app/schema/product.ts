import { schema } from '@ioc:Adonis/Core/Validator'
/**
 * Skema validasi untuk menyimpan produk
 */
export const saveSchema = schema.create({
  name: schema.string(),
  description: schema.string(),
  price: schema.number(),
  image: schema.file.nullableAndOptional(),
  pax: schema.number.nullableAndOptional(),
  resellerPrice: schema.number(),
})
/**
 * Skema validasi untuk mengubah produk
 */
export const updateSchema = schema.create({})
