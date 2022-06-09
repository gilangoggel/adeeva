import {observer} from "mobx-react";
import { Stack } from '@mui/material'
import { UserBar, MessageContainer, ChatForm } from '../common'
import {useChatProvider} from "@libs/personal-chat";

const sx = {
  height: "100vh",
  overflow: "auto",
  '& > .content':{
    overflowY : "auto"
  }
}

export const Container = observer( () => {
  const [ {store} ] = useChatProvider();
  return (
    <Stack sx={sx}>
      <UserBar withTyping user={store.receiver as any}/>
      <MessageContainer/>
      <ChatForm/>
    </Stack>
  );
})
