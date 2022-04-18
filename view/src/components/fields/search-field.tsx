import {TextField, TextFieldProps, InputAdornment} from "@mui/material";
import {useEffect, useState} from "react";
import {Search} from "@mui/icons-material";

type Props = Omit<TextFieldProps, 'onChange'> & {
  onChange?(v: string) : void
}

export const SearchField = ({value, onChange, ...props} : Props) => {
  const [val, setVal] = useState<string>((value as string) ?? '')

  const handleChange = (e: any) => {
    setVal(e.target.value);
  }
  useEffect(()=>{
    if (val && onChange){
      onChange(val)
    }
  }, [val])


  return (
    <TextField
      {...props}
      InputProps={{
        startAdornment:(
          <InputAdornment position='start'>
            <Search/>
          </InputAdornment>
        )
      }}
      className='field'
      variant='filled'
      size='small'
      onChange={handleChange}
    />
  );
};
