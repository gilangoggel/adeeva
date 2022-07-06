import {observer} from "mobx-react";
import {Box, Divider, Button} from '@mui/material'
import {CartInfo} from "./cart-info";
import {Control} from "./control";
import {useProduct} from "@root/provider/product-utils-provider";
import {useCartItem} from "@components/features/cart/cart-item-provider";

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

type Props = {
  isCart?: boolean
}

const MoveToCart = observer( () => {
  const store  = useCartItem();
  return (
    <div>
      <Button onClick={()=>store.moveToChart()} variant='contained' fullWidth sx={{borderRadius: 3}} color='secondary'>
        Pindahkan ke cart
      </Button>
    </div>
  )
})

export const CartItem = observer( ({isCart = true}: Props) => {
  return (
    <Box sx={itemSx}>
      <div className="container">
        <Divider className='divider'/>
        <CartInfo/>
        {
          isCart ?
            <Control/> : <MoveToCart/>
        }
      </div>
    </Box>
  );
});
