import { Grid, TextField, Box } from '@mui/material'
import {CityField} from "@components/fields/city-field";
import {usePage} from "@inertiajs/inertia-react";
import {observer} from "mobx-react";
import { ShipmentFieldName, useCheckoutPage  } from '@stores/checkout'
import {PropsWithChildren, useCallback} from "react";

const commonProps = {
  variant: "filled",
  fullWidth: true,
  InputProps: {
    disableUnderline: true
  },
  color:'secondary',
  InputLabelProps:{
    shrink:true
  }
} as any

export const RecipmentField = observer( () => {
  const store = useCheckoutPage().shipment.formData;
  const fieldHandler = useCallback((name : ShipmentFieldName ,isEvt: boolean)=>{
    return (e: any) =>{
      store.updateField(name,
        isEvt ?
       e.target.value : name === "cityId" ? e.toString() : e)
    }
  }, [])
  const getFieldProps = (name: ShipmentFieldName, isEvt = true) => {
    return {
      onChange: fieldHandler(name, isEvt),
      name,
      value: store[name as keyof typeof store] as any,
      ...commonProps,
    }
  }

  return (
    <Box sx={{mb:3}}>
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <TextField label='Nama penerima' {...getFieldProps('name')}/>
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField label='kode pos' {...getFieldProps('postalCode')}/>
        </Grid>
        <Grid xs={12} md={6} item>
          <CityField  label='kota' {...getFieldProps('cityId', false)}/>
        </Grid>
        <Grid item xs={12}>
          <TextField multiline rows={5} label='Alamat' {...getFieldProps('address')}/>
        </Grid>
      </Grid>
    </Box>
  );
});
