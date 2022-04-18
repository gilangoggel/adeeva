import * as React from 'react';
import {observer} from "mobx-react";
import { productFieldStore, Context } from '@stores/product-field-store'
import {useCallback, useMemo} from "react";
import {usePage} from "@inertiajs/inertia-react";
import {Box, Button, Drawer, Grid, Theme, Typography} from "@mui/material";
import { Filter } from './filter'
import {useResellerAddProduct} from "@stores/add-product-store";
import { Item } from './item'
import { SearchOff } from '@mui/icons-material'

export const ProductField = observer( () => {
  const { products } = usePage().props;
  const store = useMemo(()=>{
    return productFieldStore.create({
      data: products as any
    })
  }, [])

  const toggler = useCallback(store.toggleDrawer, [])
  const parentStore = useResellerAddProduct();
  const items = store.list(parentStore.currentItems)
  return (
    <Context.Provider value={store}>
      <Drawer
        anchor='right'
        open={store.open}
        onClose={toggler}
        PaperProps={{
          sx:{
            width: "50vw",
            overflowY:"scroll"
          }
        }}
      >
        <Filter/>
        <Box sx={{p:2}}>
          <Grid spacing={1} justifyContent='space-between' container flexWrap='wrap'>
            {
              ! items.length ?
                <Grid sm={12} sx={{textAlign:'center'}} item>
                  <SearchOff sx={{fontSize:'5rem', color:(t: Theme)=>t.palette.grey.A400}}/>
                  <Typography align='center' sx={{
                    color:(t: Theme)=>t.palette.grey.A400
                  }}>
                    Produk tidak di temukan
                  </Typography>
                </Grid> : null
            }
            {
              items.map(item=>{
                return (
                  <Item item={item} key={item.id}/>
                )
              })
            }
          </Grid>
        </Box>
      </Drawer>
      <Button onClick={toggler} variant='outlined'>
        Pilih produk
      </Button>
    </Context.Provider>
  );
});
