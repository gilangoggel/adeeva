import {Box,Backdrop, CircularProgress, Theme} from "@mui/material";

type Props = {
  text?: string
  loading: boolean
}

export const Loader = ({ text = 'loading', loading } : Props) => {

  return (
    <Backdrop open={loading} sx={{
      zIndex: (t: Theme) => t.zIndex.appBar + 10,
      '& h3':{
        mt: 2
      }
    }}>
      <Box sx={{textAlign: 'center', color:'white'}}>
        <CircularProgress sx={{
          '& > svg':{
            color:'white'
          }
        }} size={50}/>
        <h3 className='font-poppins'>
          {text}
        </h3>
      </Box>
    </Backdrop>
  );
};
