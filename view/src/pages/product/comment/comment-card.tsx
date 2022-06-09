import {observer} from "mobx-react";
import {Box, Paper, Divider} from "@mui/material";
import moment from 'moment'

export const CommentCard = observer( ({content, username, created_at}: IComment) => {
  return (
    <Box sx={{mb: 3, px:1}}>
      <Paper sx={{p:2}}>
        <p className='font-raleway' style={{fontWeight:"bolder"}}>
          {username}
        </p>
        <Divider sx={{my:1}}/>
        <Box sx={{bgcolor:'rgba(0,0,0,0.1)', py:3, px:1, borderRadius:2}}>
          <p className='font-raleway'>
            {content}
          </p>
        </Box>
        <small className='font-raleway' style={{display:"block", textAlign: 'right'}}>
          {moment(created_at).format('y/m/d')}
        </small>
      </Paper>
    </Box>
  );
});
