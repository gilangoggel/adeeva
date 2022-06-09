import {Box, Typography} from "@mui/material";

export const QrImage = ({link}: {link : string}) => {
  return (
    <Box sx={{textAlign: 'center', mt: 2}}>
      <Typography>
        QR CODE
      </Typography>
      <img style={{height: 200, width: 200}} src={link}/>
    </Box>
  );
};
