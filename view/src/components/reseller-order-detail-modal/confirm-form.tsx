import * as React from 'react';
import {Button, Box} from "@mui/material";
import {useFormUtils} from "@hooks/use-form-utils";
import { useResellerOrder } from './hoc'
import {useMemo} from "react";

export const ConfirmForm = () => {
  const [ {entity} ] = useResellerOrder();
  const { onSubmit } = useFormUtils({}, {
    method: "put"
  })
  const uri = useMemo(()=>{
    if (! entity) return'';
    return `${window.location.pathname}/${entity.id}`;
  }, [entity])

  return (
    <Box component='form' onSubmit={onSubmit(uri)} sx={{mt: 2}}>
      <Button type='submit' size='small' sx={{borderRadius :2, textTransform:"none"}} variant='contained' fullWidth>
        Barang telah sampai
      </Button>
    </Box>
  );
};
