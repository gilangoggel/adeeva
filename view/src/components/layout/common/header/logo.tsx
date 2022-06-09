import { Box} from '@mui/material'
import {Navigation} from "@utils/navigation";

const sx = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  cursor: "pointer",
  px: 2,
  userSelect: "none",
  "& span":{
    fontSize:"1rem",
    fontWeight:"lighter",
    color:'secondary.main'
  },
  "& h1":{
    display :'flex'
  }
}

export const Logo = () => {
  return (
    <Box sx={sx} onClick={Navigation.toCallback('toHome')}>
      <h1 className='font-raleway'>
        Adeeva <span>group</span>
      </h1>
    </Box>
  );
};
