import * as React from 'react';
import {observer} from "mobx-react";
import { useCartItem } from './cart-item-provider'
import {Avatar, Box} from "@mui/material";
import {formatMoney} from "@utils/format-money";

const sx = {
  display: 'flex',
  py: 2,
  "& .info":{
    flex: 1
  }
}

type P = {
  disablePrice?: boolean
}

export const CartInfo = observer( ({disablePrice = false}: P) => {
  const store = useCartItem();
  return (
    <Box sx={sx}>
      <Avatar sx={{height: 100, width: 100}} src={store.image} />
      <div className='info font-poppins'>
        <p className=''>
          {store.name}
        </p>
        {
          disablePrice ?
          null: (
              <small>
                @ Rp {formatMoney(store.price)}
              </small>
            )
        }
      </div>
    </Box>
  );
});
