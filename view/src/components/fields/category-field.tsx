import { makeEnumSelectField, Option } from './enum-select-field'

const options : Option[] = [
  {
    value: "__disabled",
    label: "Pilih salah satu"
  },
  {
    value: "FNB",
    label: "Makanan"
  },
  {
    value: "SKINCARE",
    label: "Skincare"
  },
  {
    value: "CLOTHES",
    label: "Pakaian"
  },
]
export const CategoryField = makeEnumSelectField(options);
