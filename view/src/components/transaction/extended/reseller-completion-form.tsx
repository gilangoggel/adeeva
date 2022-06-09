import {observer} from "mobx-react";
import {Box, Button, ButtonProps, Chip, Collapse, TextField} from "@mui/material";
import {useToggle} from "@hooks/use-toggle";
import {useVolatileProps} from "@hooks/use-volatile-props";
import {ComponentType, useState} from "react";
import {useTransactionExtended} from "@components/transaction/context";
import {useSnackbar} from "notistack";
import {Check} from "@mui/icons-material";
import {TransactionStatus} from "@root/enums/transaction-status";

function useControl() : [ComponentType<any>, boolean, ()=>void, boolean]{
  const [ open, toggle ] = useToggle()
  const store = useTransactionExtended();
  const isComplete = [TransactionStatus.COMPLETED, TransactionStatus.RECEIVED_TO_CUSTOMER].includes(
    store.status as any
  );
  const Control = useVolatileProps<ButtonProps>({
    color: !open ? undefined : "error",
    children : open ? "Tutup" : 'Konfirmasi pengiriman',
    disabled: store.status === "5"
  }, Button);
  return [
    Control, open, toggle, isComplete
  ]
}



const Form = ({ onSuccess }: {onSuccess(): void}) => {
  const store = useTransactionExtended();
  const [message, setMessage] = useState("");
  const [ loading,toggle ] = useToggle();
  const Submit = useVolatileProps<ButtonProps>({
    disabled: message.length < 5 || loading,
  }, Button);
  const { enqueueSnackbar } = useSnackbar()
  const onSubmit = (e: any) => {
    e.preventDefault();
    toggle()
    store.doResellerCompletion(message).then(()=>{
      enqueueSnackbar("Data berhasil diubah", {
        variant:"info", onClose(){
          onSuccess()
        }
      });
    })
  }
  const onInputChange = (e: any) => {
    setMessage(e.target.value);
  }
  return (
    <form onSubmit={onSubmit}>
      <TextField label='Keterangan' rows={5} sx={{my:2}} fullWidth multiline onChange={onInputChange} value={message}/>
      <Submit type='submit' variant='contained'>
        Simpan
      </Submit>
    </form>
  )

}

export const ResellerCompletionForm = observer( () => {
  const [Control, open, toggle, isComplete] = useControl()
  return (
    <Box sx={{p: 2, pb:0}}>
      {
        isComplete ?
          <Box sx={{my:1}}>
            <Chip color='success' icon={<Check/>} label='Transaksi telah berhasil' />
          </Box> : (
            <>
              <Control variant='contained' sx={{textTransform: "none"}} onClick={toggle}/>
              <Collapse in={open}>
                <Form onSuccess={toggle}/>
              </Collapse>
            </>
          )
      }
    </Box>
  );
});
