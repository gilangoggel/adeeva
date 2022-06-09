import { notificationModel } from '@models/notification'
import {Instance} from "mobx-state-tree";
import {ListItemText, MenuItem} from "@mui/material";
import {Notifications} from "@mui/icons-material";
import moment from "moment";
import { Inertia } from '@inertiajs/inertia'

type Store = Instance<typeof notificationModel['Type']>
type Props = {
  store: Store
  close():void
}

export const View = ({ store, close }: Props) => {

  const handler = () => {
    close()
    if (store.action_link){
      return Inertia.get(store.action_link,{},{
        preserveState: true,
        preserveScroll: true
      })
    }
  }
  return (
    <MenuItem onClick={handler}>
      <ListItemText primary={store.text} secondary={moment(store.created_at).format("DD MMMM Y")}/>
      <Notifications sx={{ml:2, color:'info.main'}}/>
    </MenuItem>
  );
};
