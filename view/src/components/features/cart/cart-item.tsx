import {observer} from "mobx-react";
import {Box, Divider} from '@mui/material'
import {CartInfo} from "./cart-info";
import {Control} from "./control";

const itemSx = {
  "& .divider":{
    my: 2,
  },
  "&:first-of-type":{
    "& .divider":{
      display: 'none'
    }
  },
  "& > .container":{
    px: 1,
  },
}

export const CartItem = observer( () => {
  return (
    <Box sx={itemSx}>
      <div className="container">
        <Divider className='divider'/>
        <CartInfo/>
        <Control/>
      </div>
    </Box>
  );
});
