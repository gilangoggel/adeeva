import {Box,Button} from "@mui/material";
import { ArrowForward } from '@mui/icons-material'
import {useTransactionExtended} from "@components/transaction/context";
import {useToggle} from "@hooks/use-toggle";
import {observer} from "mobx-react";
import {useSnackbar} from "notistack";

export const ResellerConfirm = observer( () => {
  const store = useTransactionExtended();
  const [ loading, toggle, {toggleCallback} ] = useToggle();
  const disabled = loading || parseInt(store.status) >= 3;
  const { enqueueSnackbar } = useSnackbar();
  console.log(
    store.status
  )
  const handler = () => {
    toggle()
    store.doResellerConfirm()
      .then(()=>{
        enqueueSnackbar("Order berhasil dipindahkan ke pengiriman", {
          variant: "info"
        })
      })
      .finally(toggleCallback(false, 1))
  }
  return (
    <Box sx={{px:2, pt: 2}}>
      <Button
        onClick={handler}
        disabled={disabled}
        fullWidth
        startIcon={<ArrowForward/>}
        sx={{borderRadius:2, textTransform: "none"}}
        variant='contained'
      >
        Lanjutkan ke pengiriman
      </Button>
    </Box>
  );
});
