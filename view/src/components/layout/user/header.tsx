import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Button,
  Badge
} from '@mui/material'
import {Notifications, ShoppingCart, Favorite, AccountCircle} from '@mui/icons-material'
import {toolbarSx, inputSx} from './styles'
import {Inertia} from "@inertiajs/inertia";
import {usePage} from "@inertiajs/inertia-react";
import { UserControl } from './user-control'
import { CategoryNavs } from './category-navs'
import { Logo } from './logo'
import {observer} from "mobx-react";
import {useCart} from "@stores/cart-store";
import {CartMenu} from './cart-menu'
import {useState} from "react";
import {useAuth} from "@hooks/use-auth";

const onLogin = () => {
  Inertia.get('sign-in')
}

const CartControl = observer(()=>{
  const store= useCart();
  const [el, setEl] = useState<null| HTMLButtonElement>(null);
  const handler = (e: any) => {
    setEl(el ? null: e.target);
  }
  const onClose = ( ) => setEl(null)
  return (
    <>
      <CartMenu handleClose={onClose} target={el}/>
      <Tooltip title='Keranjang belanja'>
        <Badge color='error' onMouseEnter={handler} badgeContent={store.len}>
          <IconButton>
            <ShoppingCart/>
          </IconButton>
        </Badge>
      </Tooltip>
    </>
  )
})


const ButtonControl = observer( ()=> {
  const auth = useAuth()
  console.log(auth);
  return (
    <div className='controls'>
      <Tooltip title='Wishlist'>
        <IconButton>
          <Notifications/>
        </IconButton>
      </Tooltip>
      <Tooltip title='Wishlist'>
        <IconButton>
          <Favorite/>
        </IconButton>
      </Tooltip>
      <CartControl/>
      {
        ! auth ?
          <Button
            onClick={onLogin}
            sx={{color:'primary.dark'}}
            className='font-poppins'
            startIcon={<AccountCircle sx={{color:'primary.dark'}}/>}
          >
            Login
          </Button> : (
            <UserControl/>
          )
      }
    </div>
  )
})

const sx = {
  boxShadow: 0,
  bgcolor:'white', color:'primary.dark'
}

export function Header() {
  return (
    <AppBar sx={sx} position='sticky'>
      <>
        <Toolbar sx={toolbarSx as any}>
          <Logo/>
          <CategoryNavs/>
          <ButtonControl/>
        </Toolbar>
      </>
    </AppBar>
  )
}
