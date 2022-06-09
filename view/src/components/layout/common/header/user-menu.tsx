import * as React from 'react';
import {
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent, DialogContentText, DialogActions, Button
} from "@mui/material";
import { PopupMenu, Props } from './popup-menu'
import {usePage} from "@inertiajs/inertia-react";
import {AccountCircle, ExitToApp, FavoriteBorder, ShoppingCart, Dashboard} from "@mui/icons-material";
import {Navigation} from "@utils/navigation";
import {useToggle} from "@hooks/use-toggle";
import {useFormUtils} from "@hooks/use-form-utils";
import {useEffect} from "react";
import {useAuth} from "@hooks/use-auth";

const sx = {
  "& .header":{
    p: 2,
    display: 'flex',
    alignItems:'center',
    "& > .info":{
      px: 1,
      flex:1,
      alignItems:'center',
    }
  },
  minWidth:['90vw', 300],
  "& > div":{
    px: 2,
  },
  "& .divider":{
    mt: 1
  },
  "& .links":{
    py:1
  }
}

type LogoutDialogProps = {
  open: boolean
  onCancel() : void
}


export const LogoutDialog = ( { onCancel, open } : LogoutDialogProps) => {
  const { onSubmit } = useFormUtils({}, {
    disableSnackbar: true
  })
  return (
    <Dialog open={open} onClose={onCancel}>
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
          onClick={onSubmit("/logout")}
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


export const UserMenu = (props : Props) => {
  const auth = useAuth();
  const [openLogout, toggleLogout] = useToggle();

  useEffect(()=>{
    if (! auth && props.anchor){
      props.handleClose();
    }
  }, [auth, props])
  return (
    <>
      <LogoutDialog open={openLogout} onCancel={toggleLogout}/>
      <PopupMenu {...props}>
        <Box sx={sx}>
          <div className="header">
            <Avatar src={auth.picture} alt={auth.name} sx={{height: 75, width: 75}}/>
            <div className="info font-raleway">
              <p>
                {auth.name}
              </p>
              <small>{auth.email}</small>
            </div>
          </div>
          <div>
            <Divider className='divider'/>
          </div>
          <div className='links'>
            <List disablePadding dense>
              <ListItem button onClick={Navigation.toCallback('toAccount')}>
                <ListItemIcon>
                  <AccountCircle/>
                </ListItemIcon>
                <ListItemText secondary='Akun saya'/>
              </ListItem>
              <ListItem button onClick={Navigation.toCallback('toCheckout')}>
                <ListItemIcon>
                  <ShoppingCart/>
                </ListItemIcon>
                <ListItemText secondary='Keranjang'/>
              </ListItem>
              <ListItem button onClick={Navigation.toCallback('toWishlist')}>
                <ListItemIcon>
                  <FavoriteBorder/>
                </ListItemIcon>
                <ListItemText secondary='Wishlist'/>
              </ListItem>
              {
                auth.role !== "USER" ?
                  <ListItem button onClick={Navigation.toCallback(auth.role === "ADMINISTRATOR" ? 'toAdminDashboard': "toResellerDashboard")}>
                    <ListItemIcon>
                      <Dashboard/>
                    </ListItemIcon>
                    <ListItemText secondary='Backoffice'/>
                  </ListItem> : null
              }
              <ListItem button onClick={toggleLogout}>
                <ListItemIcon>
                  <ExitToApp/>
                </ListItemIcon>
                <ListItemText secondary='Keluar'/>
              </ListItem>
            </List>
          </div>
        </Box>
      </PopupMenu>
    </>
  );
};
