import { Grid, TextField } from '@mui/material'
import {usePage} from "@inertiajs/inertia-react";
import { fieldProps as commonProps } from './common'
import { CitySelector } from './city-selector'
import { useContactFormProvider, ContactFormContext, useContactFormField } from './use-contact-form'
import { AvatarField } from './avatar-field'
import { Submit } from './submit'


export const Form = () => {
  const { errors, profile } = usePage().props;
  const context = useContactFormProvider();
  const helper = useContactFormField(context);
  return (
    <ContactFormContext.Provider value={context}>
      <Grid spacing={2} sx={{my:2}} container>
        <Grid sx={{
          borderRight: "solid 1px",
          borderColor:"rgba(0,0,0,0.2)"
        }} item sm={4}>
          <AvatarField/>
        </Grid>
        <Grid item sm={8} container spacing={2}>
          <Grid item sm={6}>
            <TextField {...commonProps as any} {...helper('name')} label='Nama'/>
          </Grid>
          <Grid item sm={6}>
            <TextField {...commonProps as any} {...helper('phoneNumber')} label='Nomor telepon'/>
          </Grid>
          <Grid item sm={6}>
            <TextField {...commonProps as any} {...helper('postalCode')} label='Kode pos'/>
          </Grid>
          <Grid item sm={6}>
            <CitySelector/>
          </Grid>
          <Grid item sm={12}>
            <TextField {...commonProps as any} {...helper('address')}  multiline label='Alamat'/>
          </Grid>
          <Grid item sm={12}>
            <Submit/>
          </Grid>
        </Grid>
      </Grid>
    </ContactFormContext.Provider>
  );
};
