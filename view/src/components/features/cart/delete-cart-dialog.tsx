import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {observer} from "mobx-react";
import {useCart} from "@stores/cart-store";

export const DeleteCartDialog = observer( () => {
  const store = useCart();
  const onDialogClose = () => store.setToDelete(null)
  return (
    <Dialog
      sx={{
        zIndex:104*100
      }}
      BackdropProps={{
        sx:{
        }
      }}
      PaperProps={{
        elevation: 4
      }}
      open={Boolean(store.toDelete)}
      onClose={onDialogClose}
    >
      <DialogTitle className='font-raleway' >
        Konfirmasi
      </DialogTitle>
      <DialogContent className='font-raleway'>
        Apakah anda yakin untuk menghapus {store.toDelete?.name} dari keranjang belanja ?
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose}>
          Tutup
        </Button>
        <Button onClick={()=>store.onDeleteCommit()}>
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
});
