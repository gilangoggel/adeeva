import {Column} from "@components/list-page";
import {ReactNode} from "react";

const config: Column<any>[] =[
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
