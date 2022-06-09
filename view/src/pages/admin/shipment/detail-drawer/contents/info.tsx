import {observer} from "mobx-react";
import {PaymentDetail, PaymentInfo, ShipmentInfo, CompleteTransaction} from "@components/transaction/extended";
import { Button, Box } from '@mui/material'
import { Check } from '@mui/icons-material'

export const Info = observer( () => {
  return (
    <div>
      <CompleteTransaction>
        {
          ({disabled, onClick})=>(
            <Box sx={{p:2, pb: 0}}>
              <Button
                sx={{borderRadius:2, textTransform: 'none'}}
                startIcon={
                <Check/>
                }
                variant='contained'
                fullWidth
                disabled={disabled}
                onClick={onClick}
              >
                Selesaikan transaksi
              </Button>
            </Box>
          )
        }
      </CompleteTransaction>
      <PaymentDetail/>
      <ShipmentInfo/>
      <PaymentInfo/>
    </div>
  );
});
