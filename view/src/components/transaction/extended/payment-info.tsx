import { ContentContainer, InfoNodes, useRenderNodes } from './content-container'
import {observer} from "mobx-react";
import {Typography} from "@mui/material";
import {useMemo} from "react";
import { QrImage } from '../partial/qr-image'
import { BankTransfer } from '../partial/bank-transfer'
import { useTransactionExtended } from '../extended/context'
import {ITransactionMeta} from "@models/transaction-extended";

export function usePaymentNodes(meta: ITransactionMeta){
  return  useMemo<InfoNodes[]>(()=>{
    return [
      {
        label: 'Nomor transaksi',
        content: <Typography variant='caption'>{meta.id.toUpperCase()}</Typography>
      },
      {
        label: 'Jumlah pembayaran',
        content: <Typography variant='caption'>Rp {meta.gross_amount}</Typography>
      },
    ].filter(Boolean) as any
  }, [meta])
}

export const Content = ({withContent = false}: {withContent?: boolean}) => {
  const store = useTransactionExtended();
  const meta = store.meta;
  const nodes = useRenderNodes(usePaymentNodes(meta));
  return (
    <>
      {
        withContent ? nodes : null
      }
      <div style={{textAlign:"center"}}>
        <img src={store.meta.paymentModeImage} style={{height: 100}} alt=""/>
      </div>
      {meta.isBankTransfer ?
        <BankTransfer va={meta.Va}/> :
        <QrImage link={meta.qrcodeLink}/>
      }
    </>
  )
}

export const PaymentInfo = observer( () => {
  const store = useTransactionExtended();
  const meta = store.meta;
  const items: InfoNodes[] = usePaymentNodes(meta)
  return (
    <ContentContainer
      title='Informasi pembayaran'
      contents={items}
    >
      <Content/>
    </ContentContainer>
  );
});
