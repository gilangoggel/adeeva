import {useToggle} from "@hooks/use-toggle";
import {useCallback, useState} from "react";
import {LoadingBackdrop} from "@components/loading-backdrop";
import {Box, Button, TextField} from "@mui/material";
import {ArrowForward} from "@mui/icons-material";
import {ITransaction} from "@models/transaction-extended";
import { useOnTrackingSaved } from '../hooks/use-on-tracking-saved'


type Props = {
  onSuccess() : void
  model: ITransaction
}

export const ShipmentField = ({model, onSuccess}: Props) => {
  const [ loading, toggle, {inline} ] = useToggle()
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const callback =useCallback( () => {
    onSuccess();
    inline(false);
  }, [trackingNumber])
  const onfinish = useOnTrackingSaved({callback});
  const onSubmit = useCallback( ( e: any ) => {
    e.preventDefault();
    toggle();
    return model
      .toShipment(trackingNumber)
      .then(onfinish)
  }, [trackingNumber])
  const handleChange = useCallback((e: any)=>{
    setTrackingNumber(e.target.value.toUpperCase())
  },[])
  return (
    <form onSubmit={onSubmit}>
      <LoadingBackdrop open={loading}  />
      <TextField disabled={loading} fullWidth label='Masukan resi pengiriman' value={trackingNumber} onChange={handleChange}/>
      <Box sx={{textAlign: 'right', py: 1}}>
        <Button
          type='submit'
          disabled={loading || trackingNumber.length < 11}
          variant='contained'
          size='small'
          sx={{textTransform: "none"}}
          startIcon={
            <ArrowForward/>
          }
        >
          Lanjutkan
        </Button>
      </Box>
    </form>
  )
};
