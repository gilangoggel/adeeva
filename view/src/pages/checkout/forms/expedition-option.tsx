import * as React from 'react';
import {ExpeditionField} from "@components/fields/expedition-field";
import {observer} from "mobx-react";
import {Collapse} from "@mui/material";
import {useCheckoutPage} from "@stores/checkout";

export const ExpeditionOption = observer( () => {

  const store = useCheckoutPage()

  return (
    <Collapse sx={{my:2}} in={store.selected === "__adeeva__"}>
      <ExpeditionField fullWidth label='Expedisi pengiriman' size='small' onChange={console.log}/>
    </Collapse>
  );
});
