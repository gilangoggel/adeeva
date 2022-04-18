import { schema } from '@ioc:Adonis/Core/Validator'

const required = (trans: string) => `${trans} wajib di isi`

export const messages = () => ({
  'file.size': 'ukuran foto tidak dapat lebih dari 2MB',
  'image.required': 'Silahkan pilih foto produk',
  'name.required': required('nama'),
  'description.required': required('deskripsi'),
  'category.required': required('Kategori'),
  'price.required': required('Harga eceran'),
  'reseller_price.required': required('Harga grosir'),
  'pax.required': required('Quantitas pembelian wajib disi'),
})

export function productSchema(isUpdate: boolean) {
  return schema.create({
    name: schema.string(),
    category: schema.string(),
    description: schema.string(),
    price: schema.number(),
    reseller_price: schema.number(),
    pax: schema.number(),
    image: isUpdate
      ? schema.file.optional({
          size: '2mb',
        })
      : schema.file({
          size: '2mb',
        }),
  })
}
