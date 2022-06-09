import {observer} from "mobx-react";
import {Box, Grid} from "@mui/material";
import {TransactionContext} from "@components/transaction/context";
import {TransactionInfo} from "./transaction-info";
import {PaymnetDetail} from "./paymnet-detail";
import {ShipmentInfo} from "./shipment-info";
import {History} from "./history";
import {Controller} from "./controller";
import {Container} from "./container";
import {useTransactionItems} from "../../partial/product-list";
import {useTransactionDialog} from '../context'

const containerSx = {
  height: 500, overflow:'auto', bgcolor:'#fcfcfc'
}
const ListRender= () => {
  const nodes = useTransactionItems()
  return <Container title='Produk'>{nodes}</Container>;
}

export const Details = observer( () => {
  const [ store ] = useTransactionDialog();
  return (
    <TransactionContext.Provider value={store}>
      <Grid container>
        <Grid item md={8}>
          <Box sx={containerSx}>
            <TransactionInfo/>
            <PaymnetDetail/>
            <ShipmentInfo/>
            <History/>
            <ListRender/>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box sx={{px:1}}>
            <Controller/>
          </Box>
        </Grid>
      </Grid>
    </TransactionContext.Provider>
  );
});
