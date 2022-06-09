import {observer} from "mobx-react";
import {useChatProvider} from "@libs/personal-chat";
import { motion, AnimatePresence } from 'framer-motion';
import { Stack, Divider } from '@mui/material'
import { MarkUnreadChatAlt } from '@mui/icons-material'
import {PropsWithChildren} from "react";
import { UserBar, ChatForm, MessageContainer } from '../common'

const AnimateDiv = motion.div;

const sx = {
  height: "100vh",
  overflowY:'hidden',
  '& > .form-container':{
    '& > div':{
      pt: 2
    }
  },
  '&[data-info="true"]':{
    "& > .container":{
      alignItems: "center",
      justifyContent: "center",
    }
  },
  '& > .container':{
    flex: 1,
    display: 'flex',
  }
}

const Container = ({ info = false, children }: PropsWithChildren<{info ?: boolean}>) => {
  return (
    <Stack
      data-info={info}
      sx={sx}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity:0}}
      transition={{
        opacity:{
          duration: 0.5
        }
      }}
      component={AnimateDiv}>
      {children}
    </Stack>
  )
}

const WithChat = observer( () => {
  const [ {store} ] = useChatProvider();
  return (
    <>
      <div className="header">
        <div>
          <UserBar user={store.receiver as any} withTyping/>
          <Divider/>
        </div>
      </div>
      <div className="container">
        <MessageContainer/>
      </div>
      <div className="form-container">
        <div>
          <ChatForm/>
        </div>
      </div>
    </>
  )
});
const SelectInfo = () =>{
  return (
    <div className='container'>
      <div style={{textAlign: "center"}}>
        <MarkUnreadChatAlt sx={{fontSize:"5rem"}}/>
        <p className='font-poppins'>
          Silahkan pilih salah satu pengguna
        </p>
      </div>
    </div>
  )
};
export const ChatContainer =observer( () => {
  const [ {store} ] = useChatProvider();
  const makeKey = () => {
    return store.receiver ?
      'chat-mode' : "select";
  }
  const key = makeKey();
  return (
    <AnimatePresence exitBeforeEnter>
      <Container key={key} info={key === "select"}>
        {
          key === "select"?
            <SelectInfo/> : <WithChat/>
        }
      </Container>
    </AnimatePresence>
  );
});
