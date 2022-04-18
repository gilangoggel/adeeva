import { cities } from '../../enums/cities'
import { makeEnumSelectField, Option } from './enum-select-field'

const items : Option[]  = cities.map((item) : Option=>({
  label: `${item.type} ${item.city_name}`,
  value: parseInt(item.city_id)
}))

export const CityField = makeEnumSelectField(items)
