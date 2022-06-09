import { Props } from './popup-menu'
import {observer} from "mobx-react";
import {
  Box,
  Drawer,
  ClickAwayListener,
  IconButton,
  Divider,
  Button
} from '@mui/material';
import {Close, ShoppingCartCheckout} from '@mui/icons-material'
import {useCart} from "@stores/cart-store";
import {formatMoney} from "@utils/format-money";
import {Navigation} from "@utils/navigation";
import {CartItemProvider, CartItem as Item, DeleteCartDialog} from '@components/features/cart'


const Header = ({onClick}: any) => {
  return (
    <div className='header'>
      <div>
        <div className="content">
          <h3 className='font-raleway'>
            Keranjang belanja
          </h3>
          <IconButton onClick={onClick}>
            <Close/>
          </IconButton>
        </div>
        <Divider/>
      </div>
    </div>
  )
}

const ItemList = observer(()=>{
  const store = useCart();
  return (
    <>
      <DeleteCartDialog/>
      <div className='list overlay-scrollbar'>
        {
          store.items.map(item=>{
            return (
              <CartItemProvider key={item.id} store={item}>
                <Item/>
              </CartItemProvider>
            )
          })
        }
      </div>
    </>
  )
})

const checkoutInfoSx = {
  "& h1":{
    fontWeight:"lighter"
  },
  "& .product-count":{
    mb: 1,
    textAlign:'right'
  },
  "& > div":{
    display: 'flex',
    justifyContent:"space-between"
  },
  "& button":{
    borderColor: '#bdbdbd',
    color:'inherit',
    py:1
  }
}

const CheckoutInfo = observer( ({onClose}: any) => {
  const store = useCart()
  return (
    <Box sx={checkoutInfoSx} className='checkout-info-container'>
      <div className='font-raleway'>
        <div>
          <p>
            Total
          </p>
          <h1>
            Rp {formatMoney(store.total)}
          </h1>
        </div>
        <div>
          <p className='product-count'>
            {store.len} produk
          </p>
        </div>
      </div>
      <div>
        <Button
          onClick={Navigation.toCallback("toCheckout",onClose )}
          startIcon={
          <ShoppingCartCheckout/>
        }
          variant='outlined'
          fullWidth
        >
          Checkout
        </Button>
      </div>
    </Box>
  )
})



export const CartMenu = observer( ({anchor, handleClose} : Props) => {
  return (
    < >
      <Drawer disableScrollLock anchor='right' hideBackdrop open={Boolean(anchor)} onClose={handleClose}>
        <ClickAwayListener onClickAway={handleClose}>
          <Box sx={sx as any}>
            <Header onClick={handleClose}/>
            <ItemList/>
            <CheckoutInfo onClose={handleClose}/>
          </Box>
        </ClickAwayListener>
      </Drawer>
    </>
  );
});
const sx = {
  height: '100vh',
  width: ["100vw",400],
  display: 'flex',
  flexDirection:"column",
  "& .checkout-info-container":{
    height: "20%",
    display: 'flex',
    flexDirection:['column'],
    justifyContent:"space-between",
    "& > div":{
      px: 2,
      py:2,
    }
  },
  "& .list":{
    height: '70%',
    overflowY:'auto',
    display: 'flex',
    flexDirection: "column"
  },
  '& .header':{
    height: '10%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    "& > div":{
      px: 2,
      flex:1,
      "& > .content":{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between'
      },
    }
  }
}
