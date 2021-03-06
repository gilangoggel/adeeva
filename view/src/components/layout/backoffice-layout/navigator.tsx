import { useBackoffice } from './provider'
import { ItemGroup, LinkItem } from './types'
import { Box,Collapse, List, ListItem, ListItemText, Divider, ListItemIcon} from "@mui/material";
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {useMemo, useState} from "react";
import { AdminChat } from '../../features/chat'
import {useAuth} from "@hooks/use-auth";
import { AdminChatProvider } from '@root/provider/admin-chat-provider'
import { ResellerChatProvider } from '@root/provider/reseller-chat-provider'

const itemSx = {
  '&[data-selected="true"]':{
    "& > *":{
      fontWeight:"bold",
      color: "primary.main"
    }
  }
}

const comparePath = (path: string) : boolean => {
  return path === window.location.pathname
}

const Item = ({to, text}: LinkItem) => {
  const { root, to : toUrl } = useBackoffice();
  const isActive = comparePath(`${root}${to}`);
  const onClick = toUrl(to)
  return (
    <ListItem button onClick={onClick} key={to} component='div'>
      <ListItemText
        sx={itemSx}
        data-selected={isActive}
        secondary={text}
        className='link'
      />
    </ListItem>
  )
}

const NavigatorItem = ({ items, title } : ItemGroup) => {
  const { root } = useBackoffice();
  const [open, setOpen] = useState<boolean>(()=>{
    const check = items.find(item=>comparePath(
      `${root}${item.to}`
    ))
    return Boolean(check)
  });

  const toggler = () => setOpen(! open);

  return (
    <>
      <ListItem component='div' button onClick={toggler}>
        <ListItemText primary={title}/>
        <ListItemIcon>
          {
            open ? <ExpandLess/> : <ExpandMore/>
          }
        </ListItemIcon>
      </ListItem>
      <Collapse in={open} timeout='auto'>
        <List component='div' disablePadding>
          {
            items.map((item=>(
              <Item {...item} key={item.to} />
            )))
          }
        </List>
      </Collapse>
      <Divider sx={{mb: 1}}/>
    </>
  )
}

export const Navigator = () => {
  const { links } = useBackoffice();
  const { role } = useAuth();
  const ChatProvider = useMemo(()=>role === "ADMINISTRATOR" ? AdminChatProvider: ResellerChatProvider, [role]);
  return (
    <div className='wrap'>
      <Item to='/dashboard'  text='Dashboard'/>
      <List component='div'>
        {
          links.map(item=>(
            <NavigatorItem {...item} key={item.title}/>
          ))
        }
      </List>
      <Box sx={{px:1}}>
        <ChatProvider>
          <AdminChat/>
        </ChatProvider>
      </Box>
    </div>
  );
};
