import { List } from '@mui/material';
import {useChatProvider} from "@libs/personal-chat";
import {observer} from "mobx-react";
import { UserBar } from '../common'

export const UserList = observer( () => {
  const [ {store} ] = useChatProvider()
  return (
    <div>
      <List disablePadding sx={{
        borderLeft:"solid 1px",
        borderColor:'rgba(0, 0, 0, 0.12)'
      }}>
        {
          store.subscriberToArray.map(item=>(
            <UserBar withReceiverControl user={item} key={item.id}/>
          ))
        }
      </List>
    </div>
  );
});
