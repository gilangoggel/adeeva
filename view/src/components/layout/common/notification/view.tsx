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
  }
  return (
    <MenuItem onClick={handler}>
      <ListItemText primary={store.text} secondary={store.date}/>
      <Notifications sx={{ml:2, color:'info.main'}}/>
    </MenuItem>
  );
};
