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


export const NotificationDrawer = ({onClose}: any) => {
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

type NotificationMenuProps = {
  target: HTMLButtonElement| null
  onClose() : void
  onMoreClick(): void
}
export const NotificationMenu = ({ target, onClose, onMoreClick }: NotificationMenuProps) => {
  const stacks = appNotification.items;
  const items = take(stacks, 5);
  return (
    <Menu
      PaperProps={{
        sx:{
          maxWidth:"300px"
        }
      }}
      open={Boolean(target)}
      onClose={onClose}
      anchorEl={target}
    >
      {
        ! appNotification.items.length ?
          <MenuItem>
            <ListItemText primary='Tidak ada notifikasi'/>
          </MenuItem>
          : null
      }
      {
        items.map(item=>(
          <View close={onClose} store={item} key={item.id} />
        ))
      }
      <MenuItem divider/>
      {
        stacks.length > 6 ?
          <MenuItem onClick={onMoreClick}>
            <ListItemText primary={`Tampilkan ${stacks.length - 5} notifikasi lainya`}/>
          </MenuItem> : null
      }
    </Menu>
  )
}

export const Notification = observer(()=>{
  const [ target, toggle, force ] = useButtonToggle();
  const [openDrawer, toggleDrawer] = useToggle();
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
      <NotificationMenu target={target} onClose={force} onMoreClick={toggleDrawer}/>
      <Badge color='error' badgeContent={appNotification.unreadedCount()}>
        <IconButton onClick={toggle}>
          <Notifications/>
        </IconButton>
      </Badge>
    </>
  )
})
