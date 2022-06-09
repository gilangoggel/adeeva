import {Box, Paper, Divider} from "@mui/material";
import { Form } from './form'

export function SignUp() {
  return (
    <Box sx={sx}>
      <div className="illustration-container">
        <img src="/assets/shop.svg" alt=""/>
      </div>
      <div className="form-container">
        <Paper className='font-poppins'>
          <Form/>
        </Paper>
      </div>
    </Box>
  );
}

const sx = {
  display: "flex",
  "& h1":{
    // fontWeight:"light",
    color:"#676767"
  },
  "& p":{
    fontWeight:"light"
  },
  "& > .form-container":{
    height: '100vh',
    p: [0,5],
    display: 'flex',
    alignItems:['flex-start','center'],
    justifyContent:'center',
    flex: 1,
    "& > div":{
      width:["100%","80%"],
      p: 2,
      borderRadius: 3,
      boxShadow:0
    }
  },
  "& > .illustration-container":{
    height: '100vh',
    bgcolor:"primary.dark",
    width: '30vw',
    p: 5,
    display: ['none','flex'],
    alignItems:'center'
  },
  "& img":{
    width: '100%'
  }
}
