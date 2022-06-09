import { Button,Grid, TextField } from '@mui/material'
import { fieldProps } from '../common'
import { useCredentialForm } from './use-credential-form'

export const Form = () => {
  const [, inputProps, {loading, onSubmit} ] = useCredentialForm();
  return (
    <Grid container sx={{my:2}} spacing={2}>
      <Grid sm={12} item>
        <TextField {...fieldProps as any} {...inputProps('email')} label='Alamat email'/>
      </Grid>
      <Grid sm={6} item>
        <TextField {...fieldProps as any} {...inputProps('password')} type='password' label='Password'/>
      </Grid>
      <Grid sm={6} item>
        <TextField {...fieldProps as any} {...inputProps('password_confirmation')} type='password' label='Konfirmasi password'/>
      </Grid>
      <Grid sm={12} sx={{textAlign: "right"}} item>
        <Button disabled={loading} variant='contained' color='secondary' sx={{borderRadius:2}} onClick={onSubmit}>
          Simpan
        </Button>
      </Grid>
    </Grid>
  );
};
