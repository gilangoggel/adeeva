import {Items} from "../order/detail-drawer/content/items";
import { make } from '../../shared/transaction-page'
import { Info } from './info'

const contents = [
  [{label: "Transaksi", name: "info"}, Info],
  [{name: 'product-list', label: "Produk"}, Items],
]

const T = make({
  tableType: "retur",
  contents: ()=>contents as any,
  title: "Pengembalian barang"
})

export const AdminRetur = T;
