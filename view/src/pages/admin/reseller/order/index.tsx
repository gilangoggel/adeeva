import { ResellerOrderPage } from '@components/reseller-order-page'

export const ResellerOrder = (props: any) => {
  return (
    <ResellerOrderPage {...props} withForm title='Pembelian produk' />
  );
};
