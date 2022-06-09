import {make} from "@root/pages/shared/transaction-page";
import { Factory } from '@components/transaction/transaction-drawer'
import {ProductListTable} from "@components/transaction/product-list-table";
import { Tracking } from '@components/shipment/tracking'
import { ResellerCompletionForm } from '@components/transaction/extended'

const Items  = ({store} : any) => {
  return (
    <ProductListTable store={store}/>
  );
};

const infoDrawer = Factory.only([
  "shipmentInfo"
])
  .withPrepend(ResellerCompletionForm)

const contents = [
  [{ label: "Informasi order",  name: "info" }, infoDrawer.factory()],
  [{ label: "Produk",  name: "product-list" }, Items],
  [{ label: "Histori",  name: "tracking" }, Tracking],
]

export const Shipment = make({
  tableType: "shipment",
  title: "Pengiriman",
  contents: ()=> contents as any,
  filterAction(v){
    return !['payment-simulator', 'reseller'].includes(v.action);
  },
  filterColumn(v){
    return !['expedition'].includes(v.key as unknown as string);
  }
})
