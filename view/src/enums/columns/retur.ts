import {Column} from "@components/list-page";
import { idColumn } from './id-colum'

const config: Column<any>[] =[
  idColumn,
  {
    key: "customer.name",
    title: "Customer"
  },
  {
    key: "address",
    title: "Alamat",
  }
]
const actions = [
  {
    label: "Informasi order",
    action: "info"
  },
  {
    label: "Produk",
    action: "product-list"
  },
]

export {config, actions}
