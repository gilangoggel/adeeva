import {Tracking} from "@components/shipment/tracking";
import {Items} from "@root/pages/admin/order/detail-drawer/content/items";
import { make } from '../../shared/transaction-page'

const contents = [
  [{name: 'product-list', label: "Produk"}, Items],
  [{label: "Tracking", name: "tracking"}, Tracking],
]

const T = make({
  tableType: "transactions",
  contents: ()=>contents as any,
  title: "Transaksi"
})

export const AdminTransaction = T;
