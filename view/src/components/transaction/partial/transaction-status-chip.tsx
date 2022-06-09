import {useTransactionExtended} from '../context'
import {Chip, ChipProps} from '@mui/material'
import {Check, Close, Timer, LocalShipping, AccessTimeFilled, PinDrop} from '@mui/icons-material'
import {ComponentType, ReactNode, useMemo} from "react";
import {observer} from "mobx-react";
import {TransactionStatus} from "@root/enums/transaction-status";
import {ITransaction} from "@models/transaction-extended";


const iconMap : Record<string, ComponentType<any>> = {
  pending: Timer,
  settlement: Check,
  expire: Close
}
const textMap : Record<string, string> = {
  pending: 'Menunggu pembayaran',
  settlement: 'Pembayaran berhasil',
  expire: 'Expire'
}
const colormap : Record<string, string> = {
  pending: 'default',
  settlement: 'success',
  expire: 'error'
}

type Item = {
  key: string| TransactionStatus
  when(transaction: ITransaction) : boolean
  color: ChipProps['color'],
  text: string
  icon: ReactNode
}

const whentTransactionIs = (status: TransactionStatus) => {
  return (transaction: ITransaction) => {
    return transaction.isStatus(status)
  }
}
const paymentComplete : Item =   {
  key: 'transaction-settled',
  when: items => {
    return items.meta.status === "settlement"
  },
  color: "success",
  text: "Pembayaran terverifikasi",
  icon: <Check/>
};
const items : Item[] = [
  {
    key: TransactionStatus.WAIT_FOR_PAYMENT,
    when: whentTransactionIs(TransactionStatus.WAIT_FOR_PAYMENT),
    color: "default",
    text: "Menuggu pembayaran",
    icon: <AccessTimeFilled/>
  },
  {
    key: TransactionStatus.SENDING,
    when: whentTransactionIs(TransactionStatus.SENDING),
    color: "default",
    text: "Pengiriman",
    icon: <LocalShipping/>
  },
  {
    key: TransactionStatus.COMPLETED,
    when: whentTransactionIs(TransactionStatus.COMPLETED),
    color: "success",
    text: "Pengiriman",
    icon: <Check/>
  },
  {
    key: TransactionStatus.RECEIVED_TO_CUSTOMER,
    when: whentTransactionIs(TransactionStatus.RECEIVED_TO_CUSTOMER),
    color: "secondary",
    text: "Barang telah diterima",
    icon: <PinDrop/>
  },
];



export const TransactionStatusChip = observer( () => {
  const transaction = useTransactionExtended()
  const filtered = useMemo(()=>{
    return [paymentComplete,... items ].filter(c=>c.when(transaction)).map(({key, color, text, icon})=>{
      return (
        <Chip
          key={key}
          sx={{mt:2, p:1, mr:1}}
          variant='outlined'
          color={color}
          size='small'
          component='span'
          icon={icon as any}
          label={text}
        />
      )
    })
  },[transaction])
  return (
    <>
      {filtered}
    </>
  );
});
