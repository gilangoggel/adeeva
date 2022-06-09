import * as React from 'react';
import {Button, IconButton, Tooltip, Box, Drawer} from '@mui/material'
import {Search, Apps} from "@mui/icons-material";
import {useIsSm} from "@hooks/use-is-sm";
import {useButtonToggle} from "@hooks/use-button-toggle";
import { CategoryList } from '@components/category-list'
import { Logo } from './logo'
import {Navigation} from "@utils/navigation";
import {PopupMenu} from "./popup-menu";

const sx = {
  "& .mobile-only":{
    display: ['block','none']
  },
  "& .desktop-only":{
    display: ['none','block']
  }
}

const mobilePaperSx = {
  minWidth: "70vw",
  pl:2,
  "& .logo-container":{
    position: 'relative',
    minHeight: 70,
  }
}

const Mobile = () => {
  const [ mobileControl, toggleMobileControl ] = useButtonToggle()
  const isSm = useIsSm();
  return (
    <div className="mobile-only">
      <Drawer
        PaperProps={{sx: mobilePaperSx}}
        open={Boolean(mobileControl) && isSm}
        onClose={toggleMobileControl}
      >
        <div className="logo-container">
          <Logo/>
        </div>
        <p className='font-raleway'>Kategori produk</p>
        <CategoryList/>
      </Drawer>
      <IconButton onClick={toggleMobileControl}>
        <Apps/>
      </IconButton>
      <IconButton onClick={Navigation.toCallback('toSearch')}>
        <Search/>
      </IconButton>
    </div>
  )
}

const Desktop = () => {
  const [ anchor, toggle ] = useButtonToggle()
  return (
    <div className="desktop-only">
      <PopupMenu anchor={anchor} handleClose={toggle}>
        <CategoryList callback={toggle}/>
      </PopupMenu>
      <Button
        onClick={toggle}
        startIcon={
          <Apps/>
        }
        variant='outlined'
        size='small'
        className='font-raleway'
        sx={{color:'black', borderColor:"black"}}
      >
        Kategori produk
      </Button>
      <Tooltip title='Pencarian'>
        <IconButton onClick={Navigation.toCallback('toSearch')} sx={{ml: 2}}>
          <Search/>
        </IconButton>
      </Tooltip>
    </div>
  )
}

export const CategoryMenu = () => {
  return (
    <Box sx={sx}>
      <Mobile/>
      <Desktop/>
    </Box>
  );
};
