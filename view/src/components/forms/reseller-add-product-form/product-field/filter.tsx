import * as React from 'react';
import {AppBar, TextField, InputAdornment, Box, Button} from "@mui/material";
import {AddShoppingCart, Search} from "@mui/icons-material";
import {observer} from "mobx-react";
import {useProductFieldStore} from "@stores/product-field-store";
import {useCallback} from "react";
import {useResellerAddProduct} from "@stores/add-product-store";


export const Filter = observer( () => {
  const store = useProductFieldStore();
  const parentStore = useResellerAddProduct();
  const onChange = useCallback((e:any)=>{
    store.setSearch(
      e.target.value
    )
  }, []);
  const onSubmit = () => {
    parentStore.addMany(store.itemSnapshoot);
    store.reset()
  }

  return (
    <AppBar position='sticky' sx={{bgcolor:'white', p:1}}>
      <TextField
        onChange={onChange}
        value={store.search}
        placeholder='Pencarian'
        fullWidth
        InputProps={{
          startAdornment:(
            <InputAdornment position='start'>
              <Search/>
            </InputAdornment>
          )
        }}
        variant='filled'
        hiddenLabel
        size='small'
      />
      <Box sx={{display: 'flex', justifyContent:'space-between', mt: 1, color:'primary.main', alignItems:'center'}}>
        <Box component='p' sx={{p: 0, mb: 0}} className='font-poppins'>
          {store.itemCount} dipilih
        </Box>
        <Button
          disabled={! store.itemCount}
          variant='contained'
          onClick={onSubmit}
          startIcon={
            <AddShoppingCart/>
          }
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}>
          Tambahkan ke keranjang
        </Button>
      </Box>
    </AppBar>
  );
});
