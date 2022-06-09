import * as React from 'react';
import {IconButton,Box ,TextField} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import { useCartItem } from './cart-item-provider'
import {observer} from "mobx-react";
import { onKeyDownHandler } from './utils'

const sx = {
  display: 'flex',
  alignItems :'center',
  "& div":{
    px:1
  }
}

export const AmountControl = observer( () => {
  const store = useCartItem();
  const onKeyDown = onKeyDownHandler(store);
  return (
    <Box sx={sx}>
      <IconButton onClick={()=>store.decrease()} size='small'>
        <Remove/>
      </IconButton>
      <div>
        <TextField
          onKeyDown={onKeyDown}
          InputProps={inputProps as any}
          value={store.amount}
          hiddenLabel
          size='small'
          variant='filled'
          sx={{width: '4rem'}}
        />
      </div>
      <IconButton onClick={()=>store.increase()} size='small'>
        <Add/>
      </IconButton>
    </Box>
  );
});
const inputProps = {
  sx:{
    "&::after":{
      borderColor :'black'
    },
    borderRadius: 0,
    height: '1.5rem'
  },
  inputProps:{
    style:{
      textAlign:'center'
    }
  }
}
