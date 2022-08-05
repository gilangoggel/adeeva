import { make } from '../../../shared/transaction-page'
import {TabsContent} from "@components/drawer-layout/types";
import { OrderDetail } from '../order/order-detail'
import { ProductList } from '../order/product-list'


const contents : TabsContent[] = [
  [
    {name: "detail", label: "Detail order"}, OrderDetail
  ],
  [
    {name: "items", label: "List produk"}, ProductList
  ],
];

export const Completed = make({
  tableType: "transactions", title: "Transaksi berhasil", contents: ()=> contents,
  filterAction(v){
    return !['payment-simulator', 'reseller'].includes(v.action);
  }
})
