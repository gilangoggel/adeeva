import {observer} from "mobx-react";
import {ListItemText, Menu, Badge, IconButton, MenuItem, Drawer} from "@mui/material";
import {appNotification} from "@stores/app-notification";
import {Notifications} from "@mui/icons-material";
import {useButtonToggle} from "@hooks/use-button-toggle";
import { View } from './view'
import {useEffect} from "react";
import {usePage} from "@inertiajs/inertia-react";
import {useNotification} from "@root/provider/notification-provider";
import {take} from "lodash";
import {useToggle} from "@hooks/use-toggle";


const NotificationDrawer = ({onClose}: any) => {
  const [ {items} ] = useNotification();
  return <Drawer onClose={onClose} open anchor='right'>
    {
      ! items.length ?
        <MenuItem>
          <ListItemText primary='Tidak ada notifikasi'/>
        </MenuItem>
        : null
    }
    {
      items.map(item=>(
        <View close={()=>{}} store={item} key={item.id} />
      ))
    }
  </Drawer>
}

export const Notification = observer(()=>{
  const [ target, toggle, force ] = useButtonToggle();
  const [ {items: stacks} ] = useNotification();
  const items = take(stacks, 5);
  const [openDrawer, toggleDrawer] = useToggle();
  const {notifications}  = usePage().props;


  useEffect(()=>{
    appNotification.setItems(notifications);
  },[])

  useEffect(()=>{
    if (openDrawer && target){
      force();
    }
  },[openDrawer, target])

  const { auth } = usePage().props;
  useEffect(()=>{
    if (target && auth){
      appNotification.makeAllUnreaded(
        (auth as any).id
      )
    }
  }, [auth, target])

  return (
    <>
      {
        openDrawer ?
          <NotificationDrawer onClose={toggleDrawer}/> : null
      }
      <Menu open={Boolean(target)} onClose={force} anchorEl={target}>
        {
          ! appNotification.items.length ?
            <MenuItem>
              <ListItemText primary='Tidak ada notifikasi'/>
            </MenuItem>
            : null
        }
        {
          items.map(item=>(
            <View close={force} store={item} key={item.id} />
          ))
        }
        <MenuItem divider/>
        {
          stacks.length > 6 ?
          <MenuItem onClick={toggleDrawer}>
            <ListItemText primary={`Tampilkan ${stacks.length - 5} notifikasi lainya`}/>
          </MenuItem> : null
        }
      </Menu>
      <Badge color='error' badgeContent={appNotification.unreadedCount()}>
        <IconButton onClick={toggle}>
          <Notifications/>
        </IconButton>
      </Badge>
    </>
  )
})
