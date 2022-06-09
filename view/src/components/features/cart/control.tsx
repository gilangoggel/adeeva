import * as React from 'react';
import { AmountControl } from './amount-control'
import {IconButton, Box} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";
import {useCartItem} from './cart-item-provider'
import {observer} from "mobx-react";

const sx = {
  px: 1,
  display: 'flex',
  justifyContent: 'space-between',
}

export const Control = observer( () => {
  const store = useCartItem()
  return (
    <Box sx={sx}>
      <AmountControl/>
      <IconButton onClick={store.deleteHandler} color='secondary'>
        <DeleteForever/>
      </IconButton>
    </Box>
  );
});
