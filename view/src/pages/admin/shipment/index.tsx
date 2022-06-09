import {Info} from "./info";
import {Tracking} from "@components/shipment/tracking";
import {Items} from "../order/detail-drawer/content/items";
import { make } from '../../shared/transaction-page'

const contents = [
  [{label: "Transaksi", name: "info"}, Info],
  [{name: 'product-list', label: "Produk"}, Items],
  [{label: "Tracking", name: "tracking"}, Tracking],
]

const T = make({
  tableType: "shipment",
  contents: ()=>contents as any,
  title: "Pengiriman"
})

export const AdminShipment = T;
