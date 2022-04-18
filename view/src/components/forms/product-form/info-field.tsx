import * as React from 'react';
import {TextField} from "@mui/material";
import {useFormUtilProvider} from "@hooks/use-form-utils";
import {CategoryField} from "@components/fields/category-field";

export const InfoField = () => {
  const { fieldUtility } = useFormUtilProvider<IProduct>();


  return (
    <>
      <TextField
        {...fieldUtility('name')}
        className='field'
        fullWidth
        label='Nama produk'
        variant='filled'
      />
      <CategoryField
        {...fieldUtility('category', false)}
        className='field'
        fullWidth
        label='Kategori'
        variant='filled'
      />
      <TextField
        {...fieldUtility('description')}
        className='field'
        label='Deskripsi produk'
        fullWidth
        multiline
        minRows={10}
        variant='filled'
      />
    </>
  );
};
