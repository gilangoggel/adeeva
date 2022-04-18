import {AppBar, Container, Toolbar, FilledInput, InputAdornment, IconButton, Tooltip, Button} from '@mui/material'
import {Search, ShoppingCart, Favorite, AccountCircle} from '@mui/icons-material'
import {toolbarSx, inputSx} from './styles'
import {Inertia} from "@inertiajs/inertia";
import {usePage} from "@inertiajs/inertia-react";
import { UserControl } from './user-control'
import { CategoryNavs } from './category-navs'
import { Logo } from './logo'

function Searchbar() {
  return (
    <div className='searchbar'>
      <div>
        <FilledInput
          fullWidth
          size='small'
          startAdornment={
            <InputAdornment position='start'>
              <Search/>
            </InputAdornment>
          }
          hiddenLabel
          placeholder='Pencarian'
          sx={inputSx}
        />
      </div>
    </div>
  )
}

const onLogin = () => {
  Inertia.get('sign-in')
}

function ButtonControl() {
  const { auth } = usePage().props;
  return (
    <div className='controls'>
      <Tooltip title='Wishlist'>
        <IconButton>
          <Favorite/>
        </IconButton>
      </Tooltip>
      <Tooltip title='Kerangjang belanja'>
        <IconButton>
          <ShoppingCart/>
        </IconButton>
      </Tooltip>
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
}

export function Header() {

  return (
    <AppBar variant='outlined' sx={{bgcolor:'white', color:'primary.dark'}} position='sticky'>
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
