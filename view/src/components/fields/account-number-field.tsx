import {TextField, TextFieldProps} from "@mui/material";
import {useEffect, useState} from "react";
import {onKeyDown} from "@components/fields/money-field";
import voca from 'voca'

type Props = Omit<TextFieldProps, 'onChange'> & {
  onChange?(v: string) : void
}

function splitString(str: string){
  const splitted = str.match(/.{1,4}/g);
  if (splitted)
  return splitted.join("-");
  return ""
}
function joinString(str: string){
  return voca(str).replaceAll("-", '').value()
}

export const AccountNumberField = ({ value, onChange, ...props } : Props) => {
  const [fieldVal, setFieldVal] = useState<string>(()=>{
    if (value){
      return value as string;
    }
    return "";
  })
  const masked = (splitString(fieldVal))
  const handleChange = (e: any) => {
    const val = e.target.value as string
    setFieldVal(
      voca(val).replaceAll("-", "").value()
    )
  }
  useEffect(()=>{
    if (fieldVal && onChange){
      onChange(joinString(fieldVal))
    }
  }, [fieldVal])


  return (
    <TextField
      {...props}
      InputLabelProps={{
        shrink:true
      }}
      onChange={handleChange}
      value={masked}
      onKeyDown={onKeyDown}
      placeholder='####-####-####-####'
    />
  )
}
