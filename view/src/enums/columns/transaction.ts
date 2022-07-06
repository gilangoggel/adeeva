import {Column} from "@components/list-page";
import * as React from "react";
import { idColumn } from './id-colum'

const config: Column<any>[] =[
  idColumn,
  {
    key: "customer.name",
    title: "Customer"
  },
  {
    key: "expedition",
    title: "Expedisi pengiriman",
    render({expedition}: any): React.ReactNode {
      return `${expedition ? expedition.toLocaleUpperCase() : "-"}`
    }
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
