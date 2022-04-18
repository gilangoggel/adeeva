import * as React from 'react';
import {Inertia} from "@inertiajs/inertia";
import { Box } from '@mui/material'


const toHome = () => {
  Inertia.get('/')
}
const sx = {
  position:'relative',
  color:"primary.main",
  "& > span":{
    fontSize: '1rem',
    color:'#282828',
    position: 'absolute',
    left: "50%",
    bottom: "-0.5rem"
  }
}
export const Logo = ({}) => {
  return (
    <Box component='h1' sx={sx} onClick={toHome} className='font-poppins logo'>
      Adeeva <span>group</span>
    </Box>
  );
};
