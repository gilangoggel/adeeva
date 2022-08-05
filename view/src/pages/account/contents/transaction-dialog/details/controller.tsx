import { CheckPaymentStatus } from '@components/transaction/extended/check-payment-status'
import {Button, Box} from "@mui/material";
import {useSnackbar} from "notistack";
import { useTransactionDialog } from '../context'
import {ForwardToInbox, Check} from "@mui/icons-material";
import {ConfirmTransaction} from "@components/transaction/extended/confirm-transaction";

const messageMap = {
  pending: "Kami belum dapat menverifikasi pembayaran anda",
  settlement: "Pembayaran anda berhasil kami terverfikasi",
}

export const Controller = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [model, toggle ] = useTransactionDialog();
  const onSuccess = (v: string) =>{
    const m = messageMap[v as keyof typeof messageMap];
    if (m)
    enqueueSnackbar(m)
  }

  return (
    <div>
      <CheckPaymentStatus onSuccess={onSuccess}>
        {
          (onClick, disabled)=>(
            <Button disabled={disabled} fullWidth onClick={onClick} variant='contained' sx={{borderRadius:3}}>
              Check status pembayaran
            </Button>
          )
        }
      </CheckPaymentStatus>
      <Box sx={{p:2}}>
        <Button
          disabled={! model.canBeRetur}
          startIcon={
            <ForwardToInbox/>
          }
          color='secondary'
          onClick={toggle}
          fullWidth
          variant='contained'
          sx={{borderRadius:3}}
        >
          Pengembalian
        </Button>
      </Box>
      <ConfirmTransaction>
        {
          ({handler, isDisabled})=><Box sx={{px:2}}>
            <Button
              disabled={isDisabled}
              onClick={handler}
              color='secondary'
              fullWidth
              variant='contained'
              sx={{borderRadius:3}}
              startIcon={
                <Check/>
              }
            >
              Produk telah sampai
            </Button>
          </Box>
        }
      </ConfirmTransaction>
    </div>
  );
};
