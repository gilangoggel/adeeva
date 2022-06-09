import {useCallback, useEffect, useState} from "react";
import {TextFieldProps} from "@mui/material";

type Values = {
  [K : string] : any
}

type Props<T extends Values> = {
  getError(name: keyof T) : string
  loading: boolean
  initial: T
}

export type UseFormValueReturn<T extends Values> = [
  T, (v: keyof T)=>TextFieldProps, ()=>void
]

export type CustomHandler<T extends Values = Values> = (evt: any,setter:(v:Partial<Values>)=>void) => Partial<T>

export function useFormValues<T extends Values = Values >({ initial, getError, loading }: Props<T>) : UseFormValueReturn<T>{
  const [values, setValues] = useState<T>(initial);
  const reset = useCallback(()=>{
    setValues(initial);
  }, [initial])

  const onChange = (e : any) => {
    const name = e.target.name;
    const isFile = e.target.type === "file";
    let value = e.target.value;
    if (isFile && e.target.files && e.target.files[0]){
      value = e.target.files[0]
    }
    setValues(prev=>({...prev,[name] : value}))
  }
  const makeCustom = (callback : CustomHandler<T>) => {
    return (e: any)=>{
     const merge = callback(e, setValues as any);
     setValues(prev=>({
       ...prev,
       ...merge,
     }))
    }
  }
  const inputProps = (name: keyof T, customOnChange?: CustomHandler<T>)=>{
    const helperText = getError(name)
    return {
      onChange: customOnChange ? makeCustom(customOnChange) : onChange,
      name,
      value: values[name],
      disabled: loading,
      error:Boolean(helperText),
      helperText,
    } as any
  }
  return [values, inputProps, reset]
}
