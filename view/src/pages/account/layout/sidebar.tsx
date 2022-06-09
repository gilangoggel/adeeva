import { linkList  } from './link-list'
import {Paper, List, Divider} from "@mui/material";
import { LingListRender } from './ling-list-render'
import { UserInfo } from './user-info'

export const Sidebar = () => {
  return (
    <Paper sx={{borderRadius:3}}>
      <UserInfo/>
      <Divider sx={{my:1}}/>
      <List disablePadding component='div'>
        {
          linkList.map(item=>(
            <LingListRender {...item} key={item.title}/>
          ))
        }
      </List>
    </Paper>
  );
};
