import {Column} from "@components/list-page";
import * as React from "react";

const config: Column<any>[] =[
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
  {
    label: "Tracking",
    action: "tracking"
  },
]

export {config, actions}
