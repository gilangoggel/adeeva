import * as React from 'react';
import { Box,Divider} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import {observer} from "mobx-react";
import {CartItemProvider, DeleteCartDialog} from '@components/features/cart'
import {useCart} from "@stores/cart-store";
import { CartItem } from '@components/features/cart'

const headSx = {
  display: ['none','table-row']
}


const sx = {
  color:"primary.main",
  "& h1":{
    color:"primary.main",
    fontSize:['1.2rem', null],
    textAlign :'center'
  }
}

const bodySx = {
  display: ['block', 'table-row-group']
}

export const ProductTable = observer( () => {
  const cart = useCart();
  return (
    <Box sx={sx}>
      <h1 className='font-poppins'>
        <ShoppingCart/> Keranjang belanja
      </h1>
      <Box sx={{px:2}}>
        <Divider sx={{my:1}}/>
      </Box>
      <DeleteCartDialog/>
      <Box sx={{color: "#767676"}}>
        {
          cart.items.map(store=>(
            <CartItemProvider store={store} key={store.id}>
              <CartItem/>
            </CartItemProvider>
          ))
        }
      </Box>
    </Box>
  );
});
