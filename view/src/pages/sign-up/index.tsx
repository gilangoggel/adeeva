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
  top: 0,
  left:0,
  display: "flex",
  "& h1":{
    // fontWeight:"light",
    color:"#676767"
  },
  "& p":{
    fontWeight:"light"
  },
  "& > .form-container":{
    p: [0,5],
    display: 'flex',
    alignItems:['flex-start','center'],
    justifyContent:'center',
    flex: 1,
    "& > div":{
      width:["100%","80%"],
      p: 2,
      borderRadius: 10,
    }
  },
  "& > .illustration-container":{
    // bgcolor:"primary.dark",
    width: '30vw',
    p: 5,
    display: ['none','flex'],
    alignItems:'center'
  },
  "& img":{
    width: '100%'
  }
}
