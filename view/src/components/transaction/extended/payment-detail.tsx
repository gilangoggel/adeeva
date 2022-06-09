import {ContentContainer, InfoNodes} from "./content-container";
import {useMemo} from "react";
import {Text as text} from "../partial/text";
import { useTransactionExtended } from './context'


export function usePaymentDetailContent(hideShipping = false){
  const store = useTransactionExtended();
  const shipping = store.shipping_cost &&
    text('Biaya pengiriman', store.shipping_cost, true, `(${(store.expedition as string).toUpperCase()})`)
  const contents : InfoNodes[] = useMemo(()=>{
    return [
      text('Jumlah produk', `${store.items.length} produk`),
      text('Quantitas', `${store.productQuantity} pcs`),
      hideShipping ? null: shipping,
      text('Sub total', store.beforShipping, true),
      text('Total', store.total, true),
    ].filter(Boolean) as any
  }, [store])
  return contents
}

export const PaymentDetail = ({ hideShipping = false}: {hideShipping?: boolean}) => {
  const contents = usePaymentDetailContent(hideShipping);
  console.log(
    'shipping : ',hideShipping
  )
  return (
    <ContentContainer title='Detail order' contents={contents}/>
  );
};
