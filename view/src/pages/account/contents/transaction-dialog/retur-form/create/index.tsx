import { Box, Button, Grid, TextField, Divider } from "@mui/material";
import { observer } from "mobx-react";
import { useTransactionDialog } from '../../context';
import { ArrowBack } from '@mui/icons-material'
import { useCreateRetur, FormContext } from '@hooks/retur/use-create-retur'
import { PhotoField } from './photo-field'
import { Submitter } from './submitter'
import {useEffect} from "react";

const photoSx = {
  '& > img':{
    cursor:"pointer",
    width: "100%",
    maxHeight: 256,
    transition: "all ease .2s",
    borderRadius:2,
    '&:hover':{
      boxShadow:2
    }
  },
  display: 'flex',
  justifyContent:"space-between",
  flexDirection: 'column'
}

function useListener([retur]: ReturnType<typeof useCreateRetur>){
  const [ store, toggle ] = useTransactionDialog();
  useEffect(()=>{
    if (retur){
      store.setRetur(retur)
      toggle();
    }
  }, [retur])
}
export const Create = observer( () => {
  const [store , toggle ] = useTransactionDialog()
  const context = useCreateRetur(store)
  useListener(context);
  return (
    <FormContext.Provider value={context}>
      <Box sx={{p:2}}>
        <Button
          startIcon={
            <ArrowBack/>
          }
          color='secondary'
          onClick={toggle}
          variant='contained'
          sx={{borderRadius:3}}>
          Kembali
        </Button>
        <Divider sx={{my:1}}/>
        <Box sx={{my:2}}>
          <Grid spacing={2} container>
            <Grid sx={photoSx} sm={6} item>
              <PhotoField/>
            </Grid>
            <Grid sm={6} item>
              <TextField
                {...context[1].onChange('reason')}

                InputProps={{
                  disableUnderline:true,
                  sx:{
                    borderRadius:2
                  }
                }}
                color='secondary'
                variant='filled'
                label='Alasan pengembalian'
                fullWidth
                multiline
                rows={12}
              />
            </Grid>
            <Grid item sm={12}>
              <Submitter/>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </FormContext.Provider>
  );
});
