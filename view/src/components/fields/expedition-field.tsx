import { makeEnumSelectField, Option } from './enum-select-field'
import {Box} from "@mui/material";

const map : Record<string, string> = {
  jet: "jet.ico",
  jne: "jne.jpg",
  pos: "pos.png"
}

const sx = {
  '& img':{
    height: '2rem',
    width: "2rem",
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

const options: Option[] = ['jet', 'jne', 'pos'].map((value)=>(
  {
    label : <Content expedition={value}/>,
    value
  }
))
export const ExpeditionField = makeEnumSelectField(options)
