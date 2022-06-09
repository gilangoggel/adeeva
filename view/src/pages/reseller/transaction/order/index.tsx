import { make } from '../../../shared/transaction-page'
import { OrderDetail } from './order-detail'
import { ProductList } from './product-list'
import {TabsContent} from "@components/drawer-layout/types";


const contents : TabsContent[] = [
  [
    {name: "detail", label: "Detail order"}, OrderDetail
  ],
  [
    {name: "items", label: "List produk"}, ProductList
  ],
];

export const Order = make({
  tableType: "order", title: "Order", contents: ()=> contents,
  filterAction(v){
    return !['payment-simulator', 'reseller'].includes(v.action);
  }
})
