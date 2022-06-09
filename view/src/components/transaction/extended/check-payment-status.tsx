import {useTransactionExtended} from '../context'
import {Box, Button} from "@mui/material";
import {useToggle} from "@hooks/use-toggle";
import {observer} from "mobx-react";
import {ReactNode, useMemo} from "react";
import {TransactionStatus} from "@root/enums/transaction-status";
import {useSnackbar} from "notistack";


type Props = {
  children?(handler: ()=>void, isDisabled: boolean) : ReactNode
  isAdmin?: boolean
  onSuccess?(status: string) : void
}

const control : Props['children'] = (onClick, loading) => (
  <Button
    fullWidth
    onClick={onClick}
    disabled={loading}
    sx={{
      textTransform: "none"
    }}
    variant='contained'
  >
    Cek status pembayaran
  </Button>
)

export const CheckPaymentStatus = observer( ({children , isAdmin = false, onSuccess}: Props) => {
  const store = useTransactionExtended();
  const node = children ? children : control;
  const meta = store.meta;
  const [loading, toggle, {toggleCallback}] = useToggle()
  const isExpire = meta.isExpire;
  const { enqueueSnackbar } = useSnackbar()
  const clickHandler = () => {
    toggle();
    return store.checkPaymentStatus(isAdmin)
      .then(()=>{
        setTimeout(()=>{
          console.log('status : ', store.status ,store.isStatus(TransactionStatus.PAYMENT_CONFIRMED));
          if (store.isStatus(TransactionStatus.PAYMENT_CONFIRMED)){
            enqueueSnackbar('Pembayaran berhasil diverifikasi', {
              variant: "info"
            })
          }else{
            enqueueSnackbar('Pengguna belum melakukan pembayaran')
          }
        }, 500)
      })
      .finally(toggleCallback(false, 2))
  }

  const isDisabled =! store.isStatus(TransactionStatus.WAIT_FOR_PAYMENT) || loading;
  return (
    <Box sx={{px:2, pt:2}}>
      {
        useMemo(()=>(
          node(
            clickHandler,Boolean( isDisabled)
          )
        ), [isDisabled])
      }
      {
        isExpire && (
          <small style={{display:'block', marginTop: 8}} className='font-poppins'>
            Transaksi telah expire
          </small>
        )
      }
    </Box>
  );
});
