import {IMessageModel, useChatProvider} from '@libs/personal-chat'
import {observer} from "mobx-react";
import { Box, Divider, Typography } from '@mui/material'
import {useMemo} from "react";
import moment from 'moment';

type Props = {
  store: IMessageModel
}
const sx = {
  '& > .date-info':{
    px:2,
    '& small':{
      fontSize:"smaller"
    }
  },
  '&[data-self="true"]':{
    '& > .date-info':{
      textAlign:'right',
    },
    '& > .message':{
      justifyContent:'flex-end',
    },
  },
  '& > .message':{
    p: 1,
    pb:0,
    display: 'flex',
    justifyContent:'flex-start',
    '&[data-self="true"]':{
      justifyContent:'flex-end',
    },
    '& .box':{
      minWidth: 150,
      maxWidth: "70%",
      bgcolor:"rgba(255,255,255,255.02)",
      boxShadow:1,
      p: 1,
      px:1.5,
      borderRadius:2,
      '& small':{
        textTransform : "capitalize"
      },
    }
  },
}


export const MessageBox = observer( ({store}: Props) => {
  const [{store : chatStore} ] = useChatProvider()
  const receiver = chatStore.receiver;
  const isSelf = useMemo(()=>{
    return receiver && receiver.id === store.from
  },[store, chatStore.receiver])
  const date = useMemo(()=>{
    return moment(store.date).format("D/m/YY, h:m")
  },[])

  return (
    <Box sx={sx} data-self={!isSelf}>
      <div className='message'>
        <div className='box'>
          <small className='font-poppins'>{store.sender_name}</small>
          <Divider/>
          <p className='font-poppins'>
            {store.message}
          </p>
        </div>
      </div>
      <div className="date-info">
        <Typography variant='caption' style={{display:"block"}}>
          {date}
        </Typography>
      </div>
    </Box>
  );
});
