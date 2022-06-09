import {observer} from "mobx-react";
import {ListItemText,Menu,Badge, IconButton, MenuItem} from "@mui/material";
import {appNotification} from "@stores/app-notification";
import {Notifications} from "@mui/icons-material";
import {useButtonToggle} from "@hooks/use-button-toggle";
import { View } from './view'
import {useEffect} from "react";
import {usePage} from "@inertiajs/inertia-react";


export const Notification = observer(()=>{
  const [ target, toggle, force ] = useButtonToggle();
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
      <Menu open={Boolean(target)} onClose={force} anchorEl={target}>
        {
          ! appNotification.items.length ?
            <MenuItem>
              <ListItemText primary='Tidak ada notifikasi'/>
            </MenuItem>
            : null
        }
        {
          appNotification.items.map(item=>(
            <View close={force} store={item} key={item.id} />
          ))
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
