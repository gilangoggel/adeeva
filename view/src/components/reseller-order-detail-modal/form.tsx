import {Wrapper} from "./wrapper";
import {useCallback, useMemo, useState} from "react";
import {ExpeditionField} from "@components/fields/expedition-field";
import {Box, Button, TextField} from '@mui/material'
import {useFormUtils} from "@hooks/use-form-utils";
import { useResellerOrder } from './hoc'
import {AccountNumberField} from "@components/fields/account-number-field";

type FormValues = Record<'expedition'| "deliveryReciptNumber", string>

export const Form = () => {
  const [ {entity} , {handleClose}] = useResellerOrder();
  const { fieldUtility, onSubmit } = useFormUtils<FormValues>({
    expedition: "", deliveryReciptNumber: ""
  }, {
    onSuccess: handleClose,
    method: "put"
  })
  const uri = useMemo(()=>{
    if (! entity) return'';
    return `${window.location.pathname}/${entity.id}`;
  }, [entity])
  if (! entity){
    return <></>
  }
  return (
    <Wrapper>
      <Box sx={{
        "& .field":{
          mb: 2
        }
      }}>
        <form onSubmit={onSubmit(uri)}>
          <ExpeditionField
            variant='filled'
            fullWidth
            {...fieldUtility('expedition', false)}
            label='Expedisi pengiriman'
            className='field'
          />
          <AccountNumberField
            {...fieldUtility('deliveryReciptNumber', false)}
            fullWidth
            className='field'
            variant='filled'
            label='Nomor resi pengiriman'
          />
          <div className="field">
            <Button type='submit'>
              Simpan
            </Button>
          </div>
        </form>
      </Box>
    </Wrapper>
  );
};
