import {AppBar, Toolbar, Box, Container} from '@mui/material'
import {Inertia} from "@inertiajs/inertia";
import { UserControl } from '../user/user-control'
import { Notification } from '../common/notification'

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
      <Container>
        <Toolbar>
          <h1 onClick={toHome} className='font-poppins'>
            Adeeva
          </h1>
          <Box sx={{ml:'auto', 'color': 'white', button:{
              color:'white'
            }}}>
            <Notification/>
            <UserControl disableBackoffice/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
