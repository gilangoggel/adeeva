import { ShoppingCart, AccountCircle, Notifications } from '@mui/icons-material'
import { IconButton, Box, Badge } from '@mui/material'
import { useHeader } from './context'
import { Inertia } from '@inertiajs/inertia'
import {observer} from "mobx-react";
import {useAuth} from "@hooks/use-auth";
import {useCart} from "@stores/cart-store";
import {PropsWithChildren, ReactElement, ReactNode, useEffect} from "react";
import {appNotification} from "@stores/app-notification";
import axios  from 'axios'
import { NotificationMenu, NotificationDrawer } from '../../common/notification'
import {useToggle} from "@hooks/use-toggle";

const sx = {
  p: 2,
  '& .hidden-mobile':{
    display: ["none", 'inline-flex']
  }
}

const toSignIn = () => {
  return Inertia.get('/sign-in')
}

const BagdeController = ({children, count}: PropsWithChildren<{count: number}>) => {
  if (! count) return <>{children}</>;
  return(
    <Badge color='error' badgeContent={count}>
      {children}
    </Badge>
  )
}

export const RightContent = observer( () => {
  const [_, handler ] = useHeader();
  const cart = useCart();
  const auth = useAuth();
  const unread = appNotification.unreadedCount();
  const [isNotifDrawerOpen, toggle] = useToggle()
  const user = useAuth();

  useEffect(()=>{
    if (user && isNotifDrawerOpen){
      appNotification.clearUnreaded();
    }
  },[isNotifDrawerOpen, user]);

  useEffect(()=>{
    if (user){
      axios.get("notifications").then(({data})=> {
        appNotification.clear();
        appNotification.setItems(data);
      })
    }
  },[user]);
  return (
    <Box sx={sx}>
      {
        user ?
          <>
            <BagdeController count={unread}>
              <IconButton onClick={toggle} className='hidden-mobile' color='secondary'>
                <Notifications/>
              </IconButton>
            </BagdeController>
            {
              isNotifDrawerOpen ?
                <NotificationDrawer onClose={toggle}/> : null
            }
            {/*<NotificationMenu target={targetNotification} onClose={closeNotificationMenu} onMoreClick={toggle}/>*/}
          </> : null
      }
      <BagdeController count={cart.items.length}>
        <IconButton onClick={handler('cart')} className='hidden-mobile' color='secondary'>
          <ShoppingCart/>
        </IconButton>
      </BagdeController>
      <IconButton color='secondary' onClick={ auth ? handler('usermenu') : toSignIn}>
        <AccountCircle/>
      </IconButton>
    </Box>
  );
});
