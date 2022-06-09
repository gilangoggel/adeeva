import { ChatDrawer, OnlineControl } from '../common'
import {useToggle} from "@hooks/use-toggle";
import { Button, Grid } from '@mui/material'
import { UserList } from './user-list'
import { ChatContainer } from './chat-container'
import {useAdminChat} from "@root/provider/admin-chat-provider";

export const Admin = () => {
  const [ open,toggle ] = useToggle()
  const onlineToggle = useAdminChat();
  return (
    <>
      <Button fullWidth variant='contained' onClick={toggle}>
        Live chat
      </Button>
      <ChatDrawer width='60vw' open={open} onClose={toggle}>
        <Grid container>
          <Grid item sm={8}>
            <ChatContainer/>
          </Grid>
          <Grid item sx={{height: '100vh', overflowY:'auto'}} sm={4}>
            <OnlineControl callback={onlineToggle}/>
            <UserList/>
          </Grid>
        </Grid>
      </ChatDrawer>
    </>
  );
};
