import {observer} from "mobx-react";
import {useToggle} from "@hooks/use-toggle";
import {useCallback, useEffect, useState} from "react";
import {LoadingBackdrop} from "@components/loading-backdrop";
import {Box, Button, Collapse, Stack, TextField} from "@mui/material";
import { useTransactionExtended } from '@components/transaction/context'
import {usePage} from "@inertiajs/inertia-react";
import {useSnackbar} from "notistack";

export const TrackingForm = observer( ({children}: any) => {
  const store = useTransactionExtended();
  const [ loading, toggle, loadingFunc ] = useToggle();
  const [ open, toggleOpen, {toggleCallback} ] = useToggle();
  const [text, setText] = useState<string>()
  const onInput = useCallback((e: any)=>{
    setText(e.target.value)
  }, []);
  useEffect(()=>{
    ! open && text && setText("")
  },[text, open]);
  const {auth} = usePage().props as any;
  const {enqueueSnackbar}  = useSnackbar()
  const onSubmit = useCallback( (e: any) => {
    e.preventDefault();
    if (text){
      toggle()
      store.trakingRequest(
        auth.role === "ADMINISTRATOR", text
      )
        .then(()=>{
          enqueueSnackbar("Data berhasil di simpan", {
            variant: "info"
          })
        })
        .finally(loadingFunc.toggleCallback(false, 1))
        .finally(toggleCallback(false, 1))
    }
  }, [text])
  return (
    <div>
      <LoadingBackdrop open={loading}/>
      <Stack direction='row' sx={{ mb: 2,"& button": {flex: 1, textTransform :"none"} }}>
        {children}
        <Button size='small' fullWidth={open} variant='contained' onClick={toggleOpen}>
          {
            open ? 'tutup': "Tambah tracking pengiriman"
          }
        </Button>
      </Stack>
      <Collapse in={open}>
        <Box component='form' onSubmit={onSubmit}>
          <TextField fullWidth size='small' disabled={loading} value={text} onChange={onInput}/>
          <Button sx={{mt: 1}} type='submit' disabled={! text || loading}>
            Simpan
          </Button>
        </Box>
      </Collapse>
    </div>
  )
})
