import {Box, Grid, Divider, Paper, Button} from '@mui/material'
import { TabWrapper } from '../tab-wrapper'
import {CartItem, CartItemProvider, DeleteCartDialog} from "@components/features/cart";
import {useCart} from "@stores/cart-store";
import {observer} from "mobx-react";
import {formatMoney} from "@utils/format-money";
import {ArrowBack} from "@mui/icons-material";
import {Navigation} from "@utils/navigation";
import { usePageController } from '../page-controller'
import { Summary } from '../summary'
import { Layout } from '../layout'


const paperSx = {
  p:1, mr:[0,3], mb:3, borderRadius:0,
  // bgcolor:'#ccdaea'
}

export const CartTab = observer( () => {
  const cart = useCart();
  return (
    <TabWrapper>
      <DeleteCartDialog/>
      <Button
        variant='contained'
        color='secondary'
        onClick={Navigation.toCallback("toSearch")}
        startIcon={
        <ArrowBack/>
        }
        sx={{mt: 1, mb: 1}}>
        Lanjutkan belanja
      </Button>
      <Layout>
        <Box sx={{color: "#767676"}}>
          {
            cart.items.map(store=>(
              <CartItemProvider store={store} key={store.id}>
                <Paper sx={paperSx} elevation={1}>
                  <CartItem/>
                </Paper>
              </CartItemProvider>
            ))
          }
        </Box>
      </Layout>
    </TabWrapper>
  );
});
