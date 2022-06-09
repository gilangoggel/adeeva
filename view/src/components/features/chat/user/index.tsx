import {Button} from "@mui/material";
import {Chat} from "@mui/icons-material";
import {useToggle} from "@hooks/use-toggle";
import { ChatDrawer } from '../common'
import {observer} from "mobx-react";
import { Container } from './container'
import {useUserChat} from "@root/provider/user-chat-provider";
import {useEffect} from "react";

export const User = observer( () => {
  const [open, toggle ] = useToggle()
  const toggleOnline = useUserChat();
  useEffect(()=>{
    if (open){
      toggleOnline()
    }
  },[open])
  useEffect(()=>{
    toggleOnline();
  },[])
  return (
    <div>
      <Button onClick={toggle} size='small' sx={{borderRadius:2}} fullWidth variant='contained' color='secondary' startIcon={<Chat/>}>
        Chat dengan admin
      </Button>
      <ChatDrawer open={open} onClose={toggle}>
        <Container/>
      </ChatDrawer>
    </div>
  );
});
