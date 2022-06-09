import { ConfirmPayment, PaymentDetail, ShipmentInfo, PaymentInfo, CheckPaymentStatus } from '@components/transaction/extended'

export const Info = (props : any) => {
  return (
    <div>
      <CheckPaymentStatus isAdmin/>
      <PaymentDetail/>
      <ShipmentInfo/>
      <PaymentInfo/>
      <ConfirmPayment/>
    </div>
  );
};
