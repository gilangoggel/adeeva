import { DateRange } from '@components/fields/date-range'
import {Box} from "@mui/material";
import { Inertia } from '@inertiajs/inertia'


export const DateController = () => {

  const onChange = (data?: Record<'start'| 'end', Date>) => {
    if (data){
      const { start, end } = data;
      Inertia.get(window.location.pathname, {start,end}, {preserveState: true})
    }else{
      Inertia.get(window.location.pathname, {}, {preserveState: true})
    }
  }

  return (
    <Box sx={{mt:2}}>
      <DateRange onChange={onChange}/>
    </Box>
  );
};
