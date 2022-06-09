import {observer} from "mobx-react";
import { useTransactionReturn } from './context'
import {Box, Button, Collapse, Grid, TextField, Chip} from "@mui/material";
import {useToggle} from "@hooks/use-toggle";
import { ExpeditionField } from './expedition-field'
import { useSendRetur, FormContext } from '@hooks/retur/use-send-retur'
import {useEffect} from "react";
import { CheckCircle } from '@mui/icons-material'

const Form = observer( ({children} : any) => {
  const [open, toggle] = useToggle()
  const store = useTransactionReturn();
  const context = useSendRetur(store, true);
  const [ response, {onChange, onSubmit, loading} ] = context;

  useEffect(()=>{
    if (response){
      store.resend({
        tracking_number: response.tracking_number as string,
        expedition: response.expedition as string
      })
    }
  }, [response])
  return (
    <FormContext.Provider value={context}>
      <Box sx={{alignItems: 'center',display: "flex", justifyContent: "space-between",textAlign: "right"}}>
        {children}
        <Button onClick={toggle} disabled={store.has_resended} color={open ? 'error' : undefined} variant='contained'>
          {
            open ? 'Tutup' : 'Kirim ulang barang'
          }
        </Button>
      </Box>
      <Collapse in={open && ! store.has_resended} >
        <Grid container spacing={3} sx={{mt:2}} onSubmit={onSubmit} component='form'>
          <Grid item sm={12}>
            <TextField {...onChange('trackingNumber')} label='Nomor resi pengiriman' fullWidth/>
          </Grid>
          <Grid item sm={12}>
            <ExpeditionField/>
          </Grid>
          <Grid item sm={12}sx={{textAlign: "right"}}>
            <Button type='submit' disabled={loading}  variant='contained'>
              Kirim
            </Button>
          </Grid>
        </Grid>
      </Collapse>
    </FormContext.Provider>
  )
})

export const ResendForm = observer( () => {
  const store = useTransactionReturn();
  if (!store.expedition){
    return <></>
  }
  return (
    <Box sx={{mb:2, '& button':{textTransform: 'none'}}}>
      <Form>
        {
          store.has_resended ?
            <Chip icon={
              <CheckCircle/>
            } label='Barang telah di kirim ulang' color='primary'/> : null
        }
      </Form>
    </Box>
  );
});
