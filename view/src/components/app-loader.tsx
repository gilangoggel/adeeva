import { Box } from '@mui/material'
export const AppLoader = () => {
  return (
    <Box sx={{
      height: "100vh",
      position: "fixed",
      zIndex:100*100,
      overflowY:'hidden',
      top:0,
      left:0,
      width: "100vw",
      display: 'flex',
      alignItems : 'center',
      justifyContent : 'center',
      bgcolor: "rgba(0,0,0,0.5)"
    }}>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </Box>
  );
};
