import * as React from 'react';
import {Box, CircularProgress} from "@mui/material";

export const Loader = () => {

  return (
    <Box sx={{p: 3, textAlign:'center', color:'primary.light'}}>
      <CircularProgress color='inherit' />
    </Box>
  );
};
