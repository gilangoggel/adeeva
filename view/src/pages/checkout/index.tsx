import * as React from 'react';
import {observer} from "mobx-react";
import {Fragment, useEffect, useMemo} from "react";
import { Context, pageStore } from '@stores/checkout'
import { Controller } from './controller'
import { Container } from "@mui/material";
import { CartTab } from './cart-tab'
import { ShipmentTab } from './shipment-tab'
import { PaymentTab } from './payment-tab'
import { AnimatePresence } from 'framer-motion'
import { Box } from '@mui/material'
import { PageControllerContext, usePageControllerProvider } from './page-controller'
import { HowToTab } from './how-to-tab'
import {usePage} from "@inertiajs/inertia-react";

const maps = [CartTab, ShipmentTab, PaymentTab, HowToTab];

const sx = {
  '& h1':{
    color:'secondary.light',
    fontWeight:"900"
  }
}

const Header = () => {
  return (
    <Box sx={sx}>
      <h1 className='font-raleway'>
        Checkout
      </h1>
    </Box>
  )
}

export const Checkout = observer( ({transaction}: any) => {
  const ctx = usePageControllerProvider();
  console.log(
    "transaction", transaction
  )
  const props = usePage().props;
  useEffect(()=>{
    if (transaction){
      pageStore.setTransaction(transaction);
      ctx[1].to(3)
    }
  }, [transaction])

  const [tab] = ctx;
  const Node = useMemo(()=>{
    const c = maps[tab];
    return c ?? Fragment;
  }, [tab])
  return (
    <Context.Provider value={pageStore}>
      <PageControllerContext.Provider  value={ctx}>
        <Container>
          <Header/>
          <Controller />
          <AnimatePresence exitBeforeEnter>
            <Node/>
          </AnimatePresence>
        </Container>
      </PageControllerContext.Provider>
    </Context.Provider>
  );
});
