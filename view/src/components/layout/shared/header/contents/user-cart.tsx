import {Box, Button, Divider, IconButton} from "@mui/material";
import {Close, ShoppingCartCheckout} from "@mui/icons-material";
import {observer} from "mobx-react";
import {CartItem as Item, CartItemProvider, DeleteCartDialog} from "@components/features/cart";
import {useCart} from "@stores/cart-store";
import {formatMoney} from "@utils/format-money";
import {Navigation} from "@utils/navigation";
import { useHeader } from '../context'
import { DrawerContentLayout } from './drawer-content-layout'

const headerSx = {
  '& .content':{
    display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between",
    p:2,
    '& h3':{
      color: "secondary.main"
    }
  }
}

const Header = ({title, disableControl = false}: {title: string, disableControl?: boolean}) => {
  const [_, __, close ] = useHeader();
  return <Box sx={headerSx} className='controllers header'>
    <div>
      <div className="content">
        <h3 className='font-raleway'>
          {title}
        </h3>
        <IconButton sx={{opacity: disableControl ? 0 : 1}} onClick={close}>
          <Close/>
        </IconButton>
      </div>
      <Divider/>
    </div>
  </Box>
}

const Content = observer(({ isCart = true }: {isCart?: boolean})=>{
  const store = useCart();
  const arr = isCart ? store.items : store.wishlists;
  return (
    <div className='item-list overlay-scrollbar'>
      {
        ! arr.length ?
          <Box sx={{p:2,textAlign:'center'}}>
            <p className='font-raleway'>
              Data tidak di temukan
            </p>
          </Box> : null
      }
      {
        arr.map(item=>{
          return (
            <CartItemProvider key={item.id} store={item}>
              <Item isCart={isCart}/>
            </CartItemProvider>
          )
        })
      }
    </div>
  )
})
const footerSx = {
  p: 2,
  '& .info':{
    display: 'flex',
    alignItems: 'center',
    justifyContent:"space-between",
    py:1,
  }
}
const Footer = observer( () => {
  const store = useCart();
  return (
    <Box sx={footerSx} className='footer'>
      <div className='font-raleway'>
        <Divider/>
        <div className='info'>
          <p>
            Total
          </p>
          <h1>
            Rp {formatMoney(store.total)}
          </h1>
        </div>
        <Divider/>
        <div className='info'>
          <p className='product-count'>
            {store.len} produk
          </p>
        </div>
      </div>
      <div className='control'>
        <Button
          color='secondary'
          onClick={Navigation.toCallback("toCheckout")}
          sx={{
            borderRadius: 3
          }}
          startIcon={
            <ShoppingCartCheckout/>
          }
          variant='contained'
          fullWidth
        >
          Checkout
        </Button>
      </div>
    </Box>
  )
})

export const UserCart = () => {
  return (
    <Box sx={sx}>
      <DeleteCartDialog/>
      <Box sx={{minWidth: ['100%', '100%', '30vw', '20vw']}}>
        <DrawerContentLayout
          header={<Header disableControl title='Wishlist'/>}
        >
          <Content isCart={false}/>
        </DrawerContentLayout>
      </Box>
      <Box sx={{minWidth: ['100%', '100%', '40vw', '30vw']}}>
        <DrawerContentLayout
          footer={<Footer/>}
          header={<Header title='Keranjang belanja'/>}
        >
          <Content />
        </DrawerContentLayout>
      </Box>
    </Box>
  );
};


const sx = {
  display: 'flex',
}
