import {CompleteTransaction} from "@components/transaction/extended";
import {Box, Button} from "@mui/material";
import {Check} from "@mui/icons-material";
import { Factory } from '@components/transaction/transaction-drawer'
import {observer} from "mobx-react";

const Content = Factory.only([
  'paymentDetail','shipmentInfo','paymentInfo'
]).factory();

export const Info = observer( () => {
  return (
    <div>
      <CompleteTransaction>
        {
          ({disabled, onClick})=>{
            console.log(
              'Disabled : ',disabled
            )
            return (
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
        }
      </CompleteTransaction>
      <Content/>
    </div>
  );
});
