import { TrackingForm } from './form'
import {usePage} from "@inertiajs/inertia-react";
import {Box, Button, Step, StepLabel, Stepper} from "@mui/material";
import { useTransactionExtended } from '../../transaction/context'
import {CopyTracingNumber} from "@components/shipment/copy-tracing-number";
import {FiberManualRecord} from "@mui/icons-material";
import {observer} from "mobx-react";
import moment from 'moment';

type Props = {
  hideTrackingNumber?: boolean
}

export const Tracking = observer( ({hideTrackingNumber = false}: Props) => {
  const store  = useTransactionExtended();
  const isFormDisabled = store.reseller_id || (usePage().props.auth as any).role === "USER";
  const isHidden =
    store.reseller_id || hideTrackingNumber
  return (
    <Box sx={{p:2}}>
      {
        ! isHidden ?
          <CopyTracingNumber traceNumber={store.tracking_number as string}/> : null
      }
      {
        isFormDisabled ? null : (
          <TrackingForm>
            <Button size='small' onClick={store.onTrackingUrlClick}>
              Tracking expedisi
            </Button>
          </TrackingForm>
        )
      }
      <Stepper orientation='vertical' activeStep={0}>
        {
          store.trackings.slice().reverse().map(({id, created_at, text}, index)=>(
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
                {moment(created_at).format("DD MMM Y ")}
                 pukul {moment(created_at).format("h:m")}
              </StepLabel>
            </Step>
          ))
        }
      </Stepper>
    </Box>
  );
});
