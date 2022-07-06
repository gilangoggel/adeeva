import { ShoppingCart, AccountCircle } from '@mui/icons-material'
import { IconButton, Box, Badge } from '@mui/material'
import { useHeader } from './context'
import { Inertia } from '@inertiajs/inertia'
import {observer} from "mobx-react";
import {useAuth} from "@hooks/use-auth";
import {useCart} from "@stores/cart-store";

const sx = {
  p: 2,
  '& .hidden-mobile':{
    display: ["none", 'inline-flex']
  }
}

const toSignIn = () => {
  return Inertia.get('/sign-in')
}

export const RightContent = observer( () => {
  const [_, handler ] = useHeader();
  const cart = useCart();
  const auth = useAuth();
  return (
    <Box sx={sx}>
      <Badge color='error' badgeContent={cart.items.length}>
        <IconButton onClick={handler('cart')} className='hidden-mobile' color='secondary'>
          <ShoppingCart/>
        </IconButton>
      </Badge>
      <IconButton color='secondary' onClick={ auth ? handler('usermenu') : toSignIn}>
        <AccountCircle/>
      </IconButton>
    </Box>
  );
});
