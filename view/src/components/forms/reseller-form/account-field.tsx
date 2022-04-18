import {useFormUtilProvider} from "@hooks/use-form-utils";
import {TextField} from "@mui/material";
import * as React from "react";

type In = {
  name: string
  password: string
  password_confirmation: string
  email: string
}

export const AccountField = () => {
  const { fieldUtility } = useFormUtilProvider<In>();
  return (
    <>
      <TextField
        {...fieldUtility('name')}
        className='field'
        fullWidth
        label='Nama pengguna'
        variant='filled'
      />
      <TextField
        {...fieldUtility('email')}
        className='field'
        fullWidth
        label='Alamat email'
        variant='filled'
      />
      <TextField
        {...fieldUtility('password')}
        className='field'
        fullWidth
        label='Password'
        variant='filled'
        type='password'
      />
      <TextField
        {...fieldUtility('password_confirmation')}
        className='field'
        fullWidth
        label='Konfirmasi password'
        variant='filled'
        type='password'
      />
    </>
  );
};
