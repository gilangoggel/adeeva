import * as React from 'react';
import {Badge, Box, IconButton} from "@mui/material";
import {ShoppingCart, AccountCircle, Favorite} from "@mui/icons-material";
import { UserMenu } from './user-menu'
import {observer} from "mobx-react";
import {useButtonToggle} from "@hooks/use-button-toggle";
import {Navigation} from "@utils/navigation";
import { CartMenu } from './cart-menu'
import {useCart} from "@stores/cart-store";
import {usePage} from "@inertiajs/inertia-react";
import {useEffect} from "react";
import { Notification } from '../notification'
import {useAuth} from "@hooks/use-auth";

const sx = {
  ml: "auto",
  "& .mobile":{
    display: ['block', 'none']
  },
  "& .desktop":{
    display: ['none', 'block']
  }
}

const AccountControl = observer( () => {
  const {auth : user}  = usePage().props as any;
  const [anchor, callback, force] = useButtonToggle()
  const auth = useAuth()
  const isAuthenticated = Boolean(auth)
  useEffect(()=>{
    force()
  }, [user])
  return (
    <>
      {isAuthenticated ?
        <UserMenu anchor={anchor} handleClose={callback}/> : null
      }
      <IconButton onClick={isAuthenticated ? callback : Navigation.toCallback('toSignIn')}>
        <AccountCircle/>
      </IconButton>
    </>
  )
})
const CartControl = observer( () => {
  const [anchor, callback] = useButtonToggle();
  const cart = useCart();
  return (
    <>
      <Badge color='error' badgeContent={cart.len}>
        <IconButton onClick={callback}>
          <ShoppingCart/>
        </IconButton>
      </Badge>
      <CartMenu anchor={anchor} handleClose={callback}/>
    </>
  )
})




const Items = ({ desktop = false } : {desktop? : boolean}) => {
  return <div className={desktop ? 'desktop' :"mobile"}>
    <Notification/>
    {
      desktop ? <IconButton>
        <Favorite/>
      </IconButton> : null
    }
    <AccountControl />
    <CartControl />
  </div>
}

export const UserControl = () => {

  return (
    <Box sx={sx}>
      <Items desktop/>
      <Items />
    </Box>
  );
};
