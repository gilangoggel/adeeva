import { AppBar, Toolbar, Box } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import {Inertia} from "@inertiajs/inertia";
import { UserControl } from '../user/user-control'

const toHome = () => {
  Inertia.get("/")
}

const sx = {
  "& h1":{
    cursor: "pointer"
  }
}

export const Header = () => {

  return (
    <AppBar sx={sx} elevation={3}>
      <Toolbar>
        <h1 onClick={toHome} className='font-poppins'>
          Adeeva
        </h1>
        <Box sx={{ml:'auto', 'color': 'white', button:{
          color:'white'
          }}}>
          <UserControl disableBackoffice/>
        </Box>
        {/*<Button*/}
        {/*  startIcon={*/}
        {/*    <AccountCircle/>*/}
        {/*  }*/}
        {/*  sx={{ml: "auto", color:"white"}}>*/}
        {/*  Akun*/}
        {/*</Button>*/}
      </Toolbar>
    </AppBar>
  );
};
