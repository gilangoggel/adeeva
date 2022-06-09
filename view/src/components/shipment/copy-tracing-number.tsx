import {Box, Typography, IconButton} from "@mui/material";
import {ContentCopy} from "@mui/icons-material";
import {useCopyToClipboard} from "react-use";

export const CopyTracingNumber = ({traceNumber }:{traceNumber: string}) => {
  const [ _, toClip] = useCopyToClipboard()
  const handler = () => {
    alert("nomor resi tersalin")
    toClip(traceNumber);
  }
  return (
    <Box sx={{
      textAlign:'center',
      '& h4':{
        fontWeight:'lighter',
        mb:2,
      }
    }}>
      <h4 className='font-raleway'>
        Nomor resi
      </h4>
      <Typography component='div' sx={{mb:2, fontWeight:'lighter!important'}} variant='h6'>
        {traceNumber}
        <IconButton onClick={handler} size='small' sx={{ml:2}}>
          <ContentCopy/>
        </IconButton>
      </Typography>
    </Box>
  );
};
