import {useEffect, useState} from "react";

type Config<T> = {
  resolveValue?(...args: any[]) : T
  onChangeCallback?(v: T) : void
  initial?: T
}

export function useFieldState<T>(config: Config<T>) : [T|null, (...v:any[])=>void]{
  const [inputValue, setInputValue] = useState<T| null>(()=>config.initial ? config.initial : null);
  const { onChangeCallback } = config;
  useEffect(()=>{
    if (inputValue && onChangeCallback) onChangeCallback(inputValue)
  },[inputValue]);
  const onChange = ( event: any, ...rest: any[] ) => {
    if (config.resolveValue){
      config.resolveValue.apply(rest);
      // @ts-ignore
      const value = config.resolveValue(...rest);
      setInputValue(value);
      return
    }
    setInputValue(event.target.value)
  }
  return [inputValue, onChange]
}
