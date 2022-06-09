import {Divider, Box} from "@mui/material";

const sx = {
  '& h3':{
    color:'primary.main'
  }
}

export const TransactionInfo = () => {
  return (
    <Box sx={sx}>
      <h3 className='font-poppins'>
        Ringkasan belanja
      </h3>
      <Divider sx={{my:1}}/>
    </Box>
  );
};
