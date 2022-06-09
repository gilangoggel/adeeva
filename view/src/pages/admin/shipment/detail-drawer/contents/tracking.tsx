import {Stack , TextField,Collapse, Stepper, Step, StepLabel, Box, Button } from '@mui/material'
import {useCallback, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useToggle} from "@hooks/use-toggle";
import { store } from '@stores/tracking-stores';
import { store as pageStore } from '../../store';
import {LoadingBackdrop} from "@components/loading-backdrop";
import { FiberManualRecord } from '@mui/icons-material'
import {CopyTracingNumber} from "@components/shipment/copy-tracing-number";

const TrackingForm = observer( ({children}: any) => {
  const [ loading, toggle ] = useToggle();
  const [ open, toggleOpen ] = useToggle();
  const [text, setText] = useState<string>()
  const onInput = useCallback((e: any)=>{
    setText(e.target.value)
  }, []);
  useEffect(()=>{
    ! open && text && setText("")
  },[text, open])
  const onSubmit = useCallback( (e: any) => {
    e.preventDefault();
    if (text){
      toggle()
      store.push({
        date: new Date(),
        id: (store.tracks.length + 1).toString(),
        text
      }).then(toggle).finally(toggleOpen)
    }
  }, [text])
  return (
    <div>
      <LoadingBackdrop open={loading}/>
      <Stack direction='row' sx={{ mb: 2,"& button": {flex: 1, textTransform :"none"} }}>
        {children}
        <Button size='small' onClick={toggleOpen}>
          Tambah status
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

export const Tracking = observer( () => {

  return (
    <Box sx={{p:2}}>
      <CopyTracingNumber traceNumber={pageStore.selected ? pageStore.selected.tracking_number as string: ""}/>
      <TrackingForm>
        <Button size='small' variant='contained' onClick={store.onTrackingClick}>
          Tracking expedisi
        </Button>
      </TrackingForm>
      <Stepper orientation='vertical' activeStep={0}>
        {
          store.tracks.slice().reverse().map(({id, date, text}, index)=>(
            <Step key={id}>
              <StepLabel
                StepIconComponent={FiberManualRecord}
                StepIconProps={{
                  sx:{
                    color: index !== 0 ? "#9c9c9c":"primary.main"
                  }
                }}
                className='font-poppins'
                optional={
                  <p className='font-poppins'>
                    {text}
                  </p>
                }
              >
                {date.toDateString()}
              </StepLabel>
            </Step>
          ))
        }
      </Stepper>
    </Box>
  );
});
