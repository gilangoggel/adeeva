import { Box, Divider } from '@mui/material'
export const Container = ({children, title} : any) => {
  return (
    <Box sx={{p:2, mb: 2, bgcolor:'white'}}>
      <p style={{marginBottom: 8, fontWeight:"bolder"}} className='font-raleway'>
        {title}
      </p>
      <Divider sx={{mb: 1}}/>
      {children}
    </Box>
  );
};
