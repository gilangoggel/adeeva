import { Box ,Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextFieldProps } from '@mui/material'
import {useEffect, useState} from "react";


export type Props = Omit<TextFieldProps, 'onChange'> & {
  onChange(v: string) : void
}

const sx = {
  textTransform:'capitalize',
  display: 'flex',
  alignItems:'center',
  "& > img":{
    width: 50,
    height: 50,
  },
  "& > p":{
    mx: 2
  }
}

const banks = ['mandiri', 'bri', 'bca'];

export const BankOptions = ({ value : propval, onChange }: Props)=> {
  const [value, setValue] = useState(()=>{
    if (propval && banks.includes(propval as string)){
      return propval;
    }
    return 'mandiri'
  });

  useEffect(()=>{
    if (value){
      onChange(value as string)
    }
  },[value])

  const handleChange = (event: any) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl className='field'>
      <FormLabel>
        Bank
      </FormLabel>
      <RadioGroup
        row
        value={value}
        onChange={handleChange}
      >
        {
          banks.map(item=>(
            <FormControlLabel value={item} key={item} control={<Radio />} label={
              <Box
                sx={sx}
              >
                <img src={`/assets/bank-image/${item}.png`} alt=""/>
              </Box>
            } />
          ))
        }
      </RadioGroup>
    </FormControl>
  );
}
