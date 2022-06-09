import { View } from '../view'
import {observer} from "mobx-react";
import {Divider, Grid, TextField, Box, Button} from '@mui/material'
import { fieldProps } from '../../../common'
import { useSendRetur, FormContext } from '@hooks/retur/use-send-retur'
import {useTransactionDialog} from "@root/pages/account/contents/transaction-dialog/context";
import {useEffect} from "react";
import { ExpeditionField } from './expedition-field'

const Form = observer( () => {
  const [store] = useTransactionDialog();
  const context = useSendRetur(store.retur as any);
  const [ response, {onChange, onSubmit, loading} ]  = context
  useEffect(()=>{
    if (response){
      store.retur?.send({
        tracking_number: response.tracking_number as string,
        expedition: response.expedition as string
      })
    }
  },[response])


  return (
    <FormContext.Provider value={context}>
      <Box sx={{px:2, mt: 2}} component='form' onSubmit={onSubmit} >
        <p className='font-poppins'>
          Form pengembalian barang
        </p>
        <Divider sx={{my:1}}/>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField {...fieldProps as any} {...onChange('trackingNumber')} label='Nomor resi pengiriman' name='trackingNumber' fullWidth/>
          </Grid>
          <Grid item sm={6}>
            <ExpeditionField/>
          </Grid>
          <Grid sx={{textAlign: "right"}} item sm={12}>
            <Button variant='contained' sx={{borderRadius:2}} disabled={loading} type='submit' color='secondary'>
              Kirim
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormContext.Provider>
  )
})

export const Send = observer( () => {
  const [store] = useTransactionDialog();
  return (
    <>
      <Form/>
      <Divider sx={{my:1}}/>
      <View/>
    </>
  );
});
