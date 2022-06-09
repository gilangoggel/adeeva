import {observer} from "mobx-react";
import {Box, List, ListItem, ListItemText} from "@mui/material";
import { ConfirmationForm } from '../partial/confirmation-form'

const Node = (text: string) =>
  <ListItem key={text}>
    <ListItemText secondary={text}/>
  </ListItem>

const texts = [
  'Order melalui reseller akan di notifikasikan kepada reseller yang bersangkutan',
  'Silahkan masukan nomor resi pengiriman apabila order tersebut melalui adeeva'
].map(Node);

export const ConfirmPayment = observer(( ) => {
  return (
    <Box sx={{px:2, py: 1}}>
      <List dense>
        {
          texts
        }
      </List>
      <ConfirmationForm/>
    </Box>
  );
});
