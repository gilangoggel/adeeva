// import {Info} from "./detail-drawer/content/info";
import {Items} from "./detail-drawer/content/items";
import { make } from '../../shared/transaction-page'
import { Info } from './info'
import { ResellerInfo } from '@components/transaction/reseller-info'

export enum TabTypes{
  DETAIL = 'detail',
  ITEMS = 'items',
  RESELLER = 'reseller'
}

function getContents(store : any) : any{
  return [
    [{name: TabTypes.DETAIL, label: "Detail transaksi"}, Info],
    [{name:TabTypes.ITEMS, label: "Produk"}, Items],
    store && store.reseller_id && [{label: "Reseller", name: TabTypes.RESELLER}, ResellerInfo],
  ].filter(Boolean) as any
}

export const AdminOrder = make({
  tableType: "order", title : "Order",
  contents: getContents
});
