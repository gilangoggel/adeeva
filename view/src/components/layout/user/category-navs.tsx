import {Box, Link, useMediaQuery, useTheme, Button, Drawer, IconButton} from '@mui/material'
import {useState} from "react";
import {Menu, Close} from "@mui/icons-material";
import { Logo } from './logo'
import { NavigationContent } from './navigation-content'
import { categoryLinks, ControlLinks, navigate } from './nav-maps'

type Item = {
  link: string
  label: string
}

const MobileItem = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => {
    setOpen(! open)
  }
  return (
    <>
      <Drawer
        BackdropProps={{
          sx:{
            bgcolor:"transparent"
          }
        }}
        PaperProps={{
          sx:{
            width: "100vw",
            bgcolor: "rgba(255,255,255,0.81)",
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            "& > div":{
              width: "100%",
              textAlign:'center'
            }
          }
        }}
        open={open}
        onClose={toggle}
      >
        <div>
          <Box sx={{px:2,display: 'flex', justifyContent:"space-between"}}>
            <Logo/>
            <IconButton onClick={toggle}>
              <Close/>
            </IconButton>
          </Box>
          <NavigationContent title='Kategori produk' items={categoryLinks}/>
          <NavigationContent title='' items={ControlLinks}/>
        </div>
      </Drawer>
      <Button
        sx={{textTransform: "none"}}
        startIcon={
        <Menu/>
        }
        onClick={toggle}>
        Menu
      </Button>
    </>
  )
}
export const CategoryNavs = () => {

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box sx={sx}>
      {
        isSm ? <MobileItem/> :
        categoryLinks.map(item=>(
            <Link onClick={navigate(item)} key={item.label}>
              <span>
                {item.label}
              </span>
              <div className="divider-container">
                <div className="divider"/>
              </div>
            </Link>
        ))
      }
    </Box>
  );
};
const sx = {
  '& > a':{
    px : 1,
    mx: 1.5,
    cursor: 'pointer',
    fontFamily:"Poppins",
    color: "black",
    textDecoration:"none",
    display: "inline-flex",
    flexDirection:"column",
    transition: "all ease-in-out 0.5s",
    fontWeight:"light",
    "&:hover":{
      color:'primary.main',
      "& .divider":{
        width: "90%"
      }
    },
    "& > .divider-container":{
      display: 'flex',
      justifyContent: 'center',
    },
    "& .divider":{
      width: 0,
      transition: "all ease 0.5s",
      height: 2,
      bgcolor:'primary.main'
    }
  },
  mr:'auto'
}

