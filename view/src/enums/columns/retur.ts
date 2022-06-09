import {Column} from "@components/list-page";

const config: Column<any>[] =[
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
