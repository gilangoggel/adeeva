import * as React from 'react';
import {Box, Divider} from "@mui/material";

const sx = {
  textAlign:'center',
  display: 'flex',
  justifyContent:'center',
  width: '100%',
  "& > div":{
    display: 'flex',
    justifyContent:'center',
    mx: "auto",
    flexDirection:"column"
  },
  "& .divider-container":{
    display: "flex",
    justifyContent: 'center',
    py:1,
  },
  "&:hover":{
    "& .divider":{
      width:"100%",
    },
  },
  "& .divider":{
    width:"70%",
    transition: 'all ease-in-out 0.5s'
  },
  "& h1":{
    fontWeight:"light",
    userSelect: "none"
  }
}

export const HeaderSpacer = ({children}: any) => {

  return (
    <Box sx={sx}>
      <div>
        <h1 className='font-raleway'>
          {children}
        </h1>
        <div className="divider-container">
          <Divider className='divider'/>
        </div>
      </div>
    </Box>
  );
};
