// import {PaymentDetail, ShipmentInfo} from "@components/transaction/extended";
import { ResellerConfirm } from '@components/shipment/reseller-confirm'
import {Factory} from "@components/transaction/transaction-drawer";

const El = Factory
  .only([
  'shipmentInfo', 'paymentDetail'
])
  .withProps('paymentDetail', {hideShipping: true})
  .factory();

export const OrderDetail = () => {
  return (
    <>
      <ResellerConfirm/>
      <El/>
    </>
  );
};
