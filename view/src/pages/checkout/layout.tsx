import {Button, Grid, Paper} from "@mui/material";
import {Summary} from "./summary";
import { usePageController } from './page-controller'
import {observer} from "mobx-react";
import {useMemo} from "react";
import { Submitter } from './submitter'

const labels = ['Opsi pengiriman', 'Pembayaran', 'Checkout'];

const Control = observer(()=>{
  const [tab, {toShipment, toPayment} ] = usePageController();

  const handler = useMemo(()=>{
    const cbs = [toShipment, toPayment]
    return cbs[tab]
  }, [tab])

  if (tab){
    return <Submitter/>
  }
  return (
    <Button color='secondary' onClick={handler} variant='contained' sx={{mt:2}} fullWidth>
      {labels[tab]}
    </Button>
  )
})

export const Layout = ({children}: any) => {
  const [tab ] = usePageController();
  return (
    <Grid container>
      <Grid item xs={12} md={8} lg={9}>
        {children}
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper elevation={1} sx={{px:2, pb:2, borderRadius:0}}>
          <Summary shipmentCost={tab !== 0}/>
          <Control/>
        </Paper>
      </Grid>
    </Grid>
  );
};
