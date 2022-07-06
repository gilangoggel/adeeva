import {observer} from "mobx-react";
import {useAuth} from "@hooks/use-auth";
import {Avatar, Box, Divider, List, ListItemText, ListItemIcon, ListItem} from "@mui/material";
import {ExitToApp} from "@mui/icons-material";
import { useUserLinks } from '../functions/use-user-links'
import {createElement, useEffect} from 'react'
import { Inertia } from '@inertiajs/inertia'
import {useToggle} from "@hooks/use-toggle";
import { LogoutDialog } from './logout-dialog'
import { useHeader } from '../context'

const userDisplaySx = {
  display: 'flex',
  alignItems: 'center',
  '& .info':{
    ml:2,
    userSelect: "none"
  },
  py:1,
}

const navigate = (path: string) => Inertia.get(path, {},{
  preserveState: true
})

const Navigator = observer(({ children }: any)=>{
  const links = useUserLinks();
  return (
    <Box sx={{py:2}}>
      <List disablePadding>
        {
          links.map(item=>(
            <ListItem dense button onClick={()=>navigate(item.to)} key={item.to}>
              <ListItemIcon>
                {createElement(item.icon)}
              </ListItemIcon>
              <ListItemText primary={item.label}/>
            </ListItem>
          ))
        }
        {children}
      </List>
    </Box>
  )
})

const UserDisplay = observer(()=>{
  const auth = useAuth()
  return (
    <Box sx={userDisplaySx}>
      <Avatar src={auth.picture}>
        {auth.name[0].toUpperCase()}
      </Avatar>
      <div className='info'>
        <h2 className='font-raleway' style={{textTransform:"capitalize"}}>
          {auth.name}
        </h2>
        <small className='font-raleway'>
          {auth.email}
        </small>
      </div>
    </Box>
  )
})

export const UserMenu = observer( () => {
  const auth = useAuth()
  const [openLogout, toggle] = useToggle()
  const [_, __, close ] = useHeader();

  const onCancel = close;

  if (! auth) return <></>
  return (
    <>
      <UserDisplay/>
      <Divider/>
      <LogoutDialog open={openLogout} onCancel={onCancel}/>
      <Navigator>
        <ListItem dense button onClick={toggle}>
          <ListItemIcon>
            <ExitToApp/>
          </ListItemIcon>
          <ListItemText primary='Keluar'/>
        </ListItem>
      </Navigator>
    </>
  );
});
