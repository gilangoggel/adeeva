import {ISubriberModel} from "@libs/personal-chat";
import {observer} from "mobx-react";
import {ListItem, ListItemText} from "@mui/material";

type Props = {
  user: ISubriberModel,
  withTyping?: boolean,
  withReceiverControl?: boolean
}

export const UserBar = observer( ({user, withTyping = false, withReceiverControl = false}: Props) => {

  const secondary = () => {
    if (withTyping && user.isTyping){
      return `${user.name} sedang mengetik`;
    }
    return user.online ? 'online' : 'offline'
  }

  return (
    <ListItem
      selected={!withTyping && user.isReceiver}
      component='div'
      //@ts-ignore
      button={withReceiverControl}
      onClick={withReceiverControl? user.uiHandler : undefined}
    >
      <ListItemText primary={user.name} secondary={secondary()}/>
    </ListItem>
  );
});
