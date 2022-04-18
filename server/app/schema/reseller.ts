import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { cities } from '../Enums/cities'

const cityIds = cities.map((item) => item.city_id)

const required = (trans: string) => `${trans} wajib di isi`

export const messages = () => ({
  'address.required': required('Alamat'),
  'city_id.required': required('Kota / kabupaten'),
  'bank.required': required('Bank'),
  'bank_account.required': required('Nomor rekening'),
  'email.unique': 'Alamat email telah terdaftar',
  'email.required': required('Alamat email'),
  'email.email': 'Format email salah',
  'password.confirmed': 'Konfirmasi password tidak sesuai',
  'name.alpha': 'Format nama tidak sesuai',
  'name.required': required('Nama'),
})

const accountField = {
  email: schema.string({}, [
    rules.email(),
    rules.unique({
      table: 'users',
      column: 'email',
    }),
  ]),
  password: schema.string({}, [rules.confirmed()]),
  name: schema.string({}, [
    rules.alpha({
      allow: 'space' as any,
    }),
  ]),
}
export function resellerSchema(isUpdate = false) {
  return schema.create({
    /**
     * account field
     */
    ...(isUpdate ? {} : accountField),
    /**
     * reseller field
     */
    address: schema.string(),
    city_id: schema.enum(cityIds),
    bank: schema.string(),
    bank_account: schema.number(),
  })
}
