import {Column} from "@components/list-page";
import {ReactNode} from "react";
import { idColumn } from './id-colum'

const config: Column<any>[] =[
  idColumn,
  {
    key: "customer.name",
    title: "Customer"
  },
  {
    key: "items",
    title: "Jumlah produk",
    render({items}: any): ReactNode {
      return `${items.length} produk`
    }
  },
  {
    key: "total",
    title: "Total pembayaran",
    type:"money"
  }
]

const actions = [
  {
    label: "Detail order",
    action: "detail",
  },
  {
    label: "Produk",
    action: "items",
  },
  {
    label: "Reseller",
    action: "reseller",
    disabled(entity: any): boolean {
      return ! entity.reseller_id;
    }
  },
  {
    label: "Simulasi pembayaran",
    action: "payment-simulator",
    disabled(entity: any): boolean {
      return entity.status > 3;
    }
  }
]

export {actions, config}
