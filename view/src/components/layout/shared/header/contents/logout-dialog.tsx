import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import * as React from "react";
import {useGlobalStore} from "@root/provider/globar-store-provider";
import {useSnackbar} from "notistack";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";

type LogoutDialogProps = {
  open: boolean
  onCancel() : void
}

const useLogout = (callback:()=>void) => {
  const root = useGlobalStore()
  const { enqueueSnackbar } = useSnackbar()
  return () => {
    axios.post("/logout").then(({data}) => {
      if (data.status) {
        callback();
        enqueueSnackbar('Anda berhasil keluar', {
          variant:"info"
        })
        root.setUser(null);
        if (window.location.pathname !== "/"){
          Inertia.get("/", {
            // preserveState: false
          })
        }
      }
    });
  };
}


export const LogoutDialog = ( { onCancel, open } : LogoutDialogProps) => {
  const onLogout  = useLogout(onCancel);
  return (
    <Dialog open={open} sx={{
      zIndex:102*100
    }} onClose={onCancel}>
      <DialogTitle>
        Konfirmasi keluar
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Apakah anda yakin untuk keluar dari akun anda
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'space-between'}}>
        <Button
          onClick={onCancel}
          sx={{
            textTransform: "none"
          }}>
          Tutup
        </Button>
        <Button
          onClick={onLogout}
          sx={{
            textTransform: "none",
            bgcolor:'error.light'
          }}
          variant='contained' color='error'>
          Keluar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
