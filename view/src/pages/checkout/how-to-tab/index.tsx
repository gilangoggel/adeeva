import * as React from 'react';
import {observer} from "mobx-react";
import { TabWrapper } from '../tab-wrapper'
import {useCheckoutPage} from "@stores/checkout";
import { VirtualAccount } from './virtual-payment'
import { Emoney } from './emoney'
import { SettledInfo } from './settled-info'
import { Button, Box } from '@mui/material'
import {useMemo} from "react";
import {useToggle} from "@hooks/use-toggle";
import {LoadingBackdrop} from "@components/loading-backdrop";
import {useSnackbar} from "notistack";
import { TransactionContext, useTransactionExtended } from '@components/transaction/context'
import {TransactionStatus} from "@root/enums/transaction-status";

const View = observer(()=>{
  const [ loading, _, {inline} ] = useToggle()
  const transaction = useTransactionExtended();
  const mode : "bank" | "emoney" = useMemo(()=>{
    if(['bank_transfer', 'echannel'].includes(transaction.meta.payment_type)){
      return "bank"
    }
    return "emoney"
  }, [transaction])
  const isSettled = transaction.status === TransactionStatus.PAYMENT_CONFIRMED;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onRecheck = async () => {
    inline(true)
    closeSnackbar()
    return transaction.checkPaymentStatus().then(()=>{
      setTimeout(()=>{
        inline(false);
        if (transaction.status === TransactionStatus.PAYMENT_CONFIRMED){
          enqueueSnackbar("Pembayaran telah berhasil kami verfikasi",{
            variant: "info"
          })
        }else{
          const messages = {
            [TransactionStatus.WAIT_FOR_PAYMENT] : {
              message : "Kami belum dapat memverifikasi pembayaran anda",
              color: "default"
            },
            [TransactionStatus.INVALID] : {
              message : "Pembayaran anda invalid silahkan ulangi orderan anda",
              color: "error"
            },
          }
          const props = messages[transaction.status as keyof typeof messages];
          if (! props){
            alert(`implementation for : ${transaction.status}`)
            return;
          }
          const { message, color }= props
          enqueueSnackbar(message,{
            variant: color as any
          })

        }
      },500)
    })
  }
  return (
    <>
      <LoadingBackdrop open={loading}/>
      <Box sx={{my: 3, textAlign : 'center'}}>
        <Button disabled={isSettled} onClick={onRecheck} color='secondary' variant='contained'>
          Update status pembayaran
        </Button>
      </Box>
      {
        ! isSettled ? mode === "bank" ?
          <VirtualAccount transaction={transaction}/> : (
            <Emoney transaction={transaction}/>
          ) : (
          <div>
            <SettledInfo transaction={transaction}/>
          </div>
        )
      }
    </>
  )
})


export const HowToTab = observer( () => {
  const store = useCheckoutPage();
  return (
    <TabWrapper>
      {store.transaction ?
        <TransactionContext.Provider value={store.transaction}>
          <View/>
        </TransactionContext.Provider>
         : null
      }
    </TabWrapper>
  );
});
