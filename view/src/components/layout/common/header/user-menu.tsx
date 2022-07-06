import * as React from 'react';
import {useEffect} from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {PopupMenu, Props} from './popup-menu'
import {AccountCircle, Dashboard, ExitToApp, FavoriteBorder, ShoppingCart} from "@mui/icons-material";
import {Navigation} from "@utils/navigation";
import {useToggle} from "@hooks/use-toggle";
import {useAuth} from "@hooks/use-auth";
import axios from 'axios'
import {useGlobalStore} from "@root/provider/globar-store-provider";
import { Inertia } from '@inertiajs/inertia'
import { useAppHeader } from '../contexts/use-app-header'
import {useSnackbar} from "notistack";

const sx = {
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
const avatarSx = {
  p: 2,
  display: 'flex',
  alignItems:'center',
  "& > .info":{
    px: 1,
    flex:1,
    alignItems:'center',
  }
}

type LogoutDialogProps = {
  open: boolean
  onCancel() : void
}


const useLogout = (callback:()=>void) => {
  const root = useGlobalStore()
  const [_, toggler] = useAppHeader();
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
    }).finally(toggler('user_menu', false))
  };
}

export const LogoutDialog = ( { onCancel, open } : LogoutDialogProps) => {
  const onLogout  = useLogout(onCancel);
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


export const UserAvatar = () => {
  const auth = useAuth();
  return (
    <>
      <Box sx={avatarSx} className="header">
        <Avatar src={auth.picture} alt={auth.name} sx={{height: 75, width: 75}}/>
        <div className="info font-raleway">
          <p>
            {auth.name}
          </p>
          <small>{auth.email}</small>
        </div>
      </Box>
      <div>
        <Divider className='divider'/>
      </div>
    </>
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

  const [ {user_menu} ] = useAppHeader();

  return (
    <>
      <LogoutDialog open={openLogout} onCancel={toggleLogout}/>
      <PopupMenu {...props} anchor={ user_menu ? props.anchor: null}>
        <Box sx={sx}>
          <UserAvatar/>
          <div className='links'>
            <List disablePadding dense>
              {
                auth.role !== "USER" ?
                  <ListItem button onClick={Navigation.toCallback(auth.role === "ADMINISTRATOR" ? 'toAdminDashboard': "toResellerDashboard")}>
                    <ListItemIcon>
                      <Dashboard/>
                    </ListItemIcon>
                    <ListItemText secondary='Backoffice'/>
                  </ListItem> :
                  (
                    <>
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
                    </>
                  )
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
