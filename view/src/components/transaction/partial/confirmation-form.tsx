import {ITransaction} from "@models/transaction-extended";
import {observer} from "mobx-react";
import {Box, Button, Collapse} from "@mui/material";
import {LocalShipping, Notifications} from '@mui/icons-material'
import {useMemo} from "react";
import {useToggle} from "@hooks/use-toggle";
import {ShipmentField} from './shipment-field'
import {useTransactionExtended} from '../extended/context'
import {useSnackbar} from "notistack";
import {TransactionStatus} from "@root/enums/transaction-status";

type Props = {
  model : ITransaction
}

const getControlContent = (shipmentMode: boolean) => ({
  text : shipmentMode ? "Lanjutkan ke pengiriman" : "Notifikasi reseller",
  icon : shipmentMode ? <LocalShipping/> : <Notifications/>
})

const Control = observer( ({model, onClick}: Props & {onClick(): void}) => {
  const reseller = model.reseller_id;
  const {text, icon} = useMemo(()=>getControlContent(!reseller), [reseller]);
  const isDisabled = () => {
    return [
      TransactionStatus.SENDING,
      TransactionStatus.RESELLER_NOTIFIED
    ].includes(model.status as TransactionStatus)
  }
  console.log(isDisabled(), model.status);


  return (
    <Button
      disabled={isDisabled()}
      onClick={onClick}
      startIcon={icon}
      variant='contained'
      sx={{textTransform: "none"}}
      fullWidth
    >
      {text}
    </Button>
  )
})
export const ConfirmationForm = observer( () => {
  const [openForm, toggleControl] = useToggle()
  const model = useTransactionExtended();
  const resellerId = model.reseller_id;
  const { enqueueSnackbar } = useSnackbar()
  const buttonHandler = () => {
    if (!resellerId) {
      return toggleControl()
    }
    return model.toShipment("").then((res)=>{
      if (res){
        enqueueSnackbar("Order telah dilanjutkan kepada reseller", {
          variant:"info"
        })
      }
    });
  }
  return (
    <>
      <Box sx={{pb: 2}}>
        <Control onClick={buttonHandler} model={model}/>
        {
          ! model.reseller_id ?
            <Box sx={{py: 2}}>
              <Collapse in={openForm}>
                <ShipmentField model={model} onSuccess={buttonHandler} />
              </Collapse>
            </Box> : null
        }
      </Box>
    </>
  );
});
