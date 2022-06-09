import { fieldProps } from '../../../common'
import {Box, TextField,MenuItem} from "@mui/material";
import {Option} from "@components/fields/enum-select-field";
import { useSendRetur } from '@hooks/retur/use-send-retur'

const map : Record<string, string> = {
  tiki: "tiki.png",
  jne: "jne.jpg",
  pos: "pos.png"
}

const sx = {
  '& img':{
    height: '1rem',
    width: "1rem",
    borderRadius:"50%"
  },
  display: 'flex', alignItems: 'center',
  '& p':{
    ml:2,
    fontWeight:"normal",
    textTransform:'uppercase',
    letterSpacing:2
  }
}
const Content = ({expedition} : {expedition: string}) => {
  return (
    <Box sx={sx}>
      <img src={`/assets/expedition/${map[expedition]}`} alt=""/>
      <p className='font-poppins'>
        {expedition}
      </p>
    </Box>
  )
}

const options: Option[] = ['tiki', 'jne', 'pos'].map((value)=>(
  {
    label : <Content expedition={value}/>,
    value
  }
))
export const ExpeditionField = () => {
  const [,{onChange} ] = useSendRetur()
  return (
    <div>
      <TextField {...fieldProps as any} label='Expedisi pengiriman' {...onChange('expedition')} select>
        {
          options.map(item=>(
            <MenuItem value={item.value} key={item.value}>
              {item.label}
            </MenuItem>
          ))
        }
      </TextField>
    </div>
  );
};
