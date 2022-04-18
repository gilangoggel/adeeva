import {TextField, TextFieldProps, InputAdornment} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import voca from 'voca'
import {formatMoney} from "@utils/format-money";

export const onKeyDown = (e: any) => {
  const regex = /^\d*$/
  const allowed = ['Backspace']
  const key = e.key;
  if (allowed.includes(key) || key.includes('Arrow')){
    return;
  }
  if (key == ","){
    const val = e.target.value
    if (!val){
      e.preventDefault();
    }
    if (val.includes(",")){
      e.preventDefault();
    }
    return;
  }

  if (! regex.test(e.key)){
    return e.preventDefault();
  }
}



type Props = Omit<TextFieldProps, 'onChange'> & {
  onChange?(v: number) : void
}

export const MoneyField = (props: Props) => {
  const [val, setValue] = useState<number>(()=>{
    const val = props.value;
    if (typeof val === "number"){
      return val
    }
    return 0;
  });
  const rpValue = useMemo(()=>{
    return formatMoney(val)
  }, [val])
  const onChange = (e : any) => {
    const val = voca(e.target.value ?? "0")
      .replaceAll(".", '')
      .replaceAll(",", '.').value();
    const num = parseFloat(val);
    setValue(isNaN(num) ? 0 : num)
  }
  const { onChange : propOnChange } = props;
  useEffect(()=>{
    propOnChange && propOnChange(val)
  }, [val])
  return (
    <TextField
      {...props}
      onChange={onChange}
      value={rpValue}
      InputProps={{
        startAdornment:(
          <InputAdornment position='start'>
            Rp
          </InputAdornment>
        )
      }}
      onKeyDown={onKeyDown}
    />
  );
};
