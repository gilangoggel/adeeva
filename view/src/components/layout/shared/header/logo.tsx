import { Box } from '@mui/material'
import { Inertia } from '@inertiajs/inertia'

const sx =  {
  position: 'absolute',
  userSelect: "none",
  cursor:"pointer",
  width:['100%', 'fit-content'],
  textAlign: 'center',
  top: '50%',
  left: "50%",
  transform: "translate(-50%, -50%)",
  color:"secondary.main",
  '& > span':{
    fontSize:"1rem",
    color: "#909090"
  }
}
const toHome = () => {
  if (window.location.pathname !== "/"){
    Inertia.get('/')
  }
};

export const Logo = () => {
  return (
    <>
      <div style={{background:'red', height: '100%', width: "100%", opacity: 0}}>
        <h1>LOGO</h1>
      </div>
      <Box onClick={toHome} className='font-raleway' component='h1' sx={sx as any}>
        Adevaa <span>Group</span>
      </Box>
    </>
  );
};
