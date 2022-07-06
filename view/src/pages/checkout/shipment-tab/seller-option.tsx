import {observer} from "mobx-react";
import {Paper, TextField, MenuItem, Grid} from "@mui/material";
import {useCheckoutPage, boot} from "@stores/checkout";
import {useEffect} from "react";
import {useCart} from "@stores/cart-store";
import { ExpeditionSelector } from './expedition-selector'
import {usePage} from "@inertiajs/inertia-react";

const SellerSelector = observer(()=>{
  const store = useCheckoutPage();
  const carts = useCart()
  const handleChange = (e: any) => {
    const v = e.target.value;
    store.updateSelected(v);
  }
  const resellers = store.resellers(
    carts.items,
    // store.shipment.formData.cityId
  )
  return (
    <TextField
      onChange={handleChange}
      value={store.selected}
      label='Pilih penjual'
      variant='filled'
      size='small'
      color='secondary'
      fullWidth
      select
      InputProps={{
        disableUnderline:true
      }}
    >
      <MenuItem value='__adeeva__'>
        Adeeva
      </MenuItem>
      {
        resellers.map(item=>(
          <MenuItem key={item.id} value={item.id}>
            {item.name} | {item.city}
          </MenuItem>
        ))
      }
    </TextField>

  )
})

export const SellerOption = observer( () => {
  const store = useCheckoutPage();
  const cart = useCart();
  const { profile, auth } = usePage().props as any
  useEffect(()=>{
    const products = cart.items.map(item=>item.id)
    boot({
      products,
      store,
      profile : {
        ...(profile ? profile : {}),
        name: auth.name
      }
    });
  }, [])
  return (
    <Paper sx={{mb: 3, p : 2, borderRadius: 0}} elevation={1}>
      <Grid container spacing={3} sx={{mb: 2}}>
        <Grid item xs={12} md={8}>
          <SellerSelector/>
        </Grid>
        <Grid item xs={12} md={4} sx={{display: 'flex'}}>
          <ExpeditionSelector/>
        </Grid>
      </Grid>
      <small className='font-poppins'>
        * Opsi pembelian melalui reseller tidak ditambahkan biaya pengiriman
      </small>
    </Paper>
  );
});
