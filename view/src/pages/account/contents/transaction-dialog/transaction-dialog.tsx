import {Divider,Dialog, DialogContent, DialogTitle } from '@mui/material'
import {observer} from "mobx-react";
import { transactionHistory as store } from '@stores/user/transaction-history'
import { Switcher } from './switcher'

const paperSx = {
  minHeight: 500, minWidth: '40vw', borderRadius: 3
}
const titleSx = {
  textAlign :'center', fontWeight:'bolder',bgcolor:'secondary.light', color:'white'
}
export const TransactionDialog = observer( () => {
  return (
    <Dialog open={Boolean(store.selected)} onClose={store.close} PaperProps={{
      sx:paperSx
    }} fullWidth>
      <DialogTitle sx={titleSx}>Detail transaksi</DialogTitle>
      <DialogContent sx={{p:0}}>
        <Divider/>
        {
          store.selected ?
            <Switcher store={store.selected}/> : null
        }
      </DialogContent>
    </Dialog>
  );
});
