import {useEffect, useState, MutableRefObject} from "react";

type UseInputFile = [
  {
    file: null | File
    url: string,
    control() : void
  },
  {
    onChange(v: any): any
    ref : MutableRefObject<null| HTMLInputElement>,
  }
]

type Props = {
  onFileChange : (v: File) => void
  initialUrl ?: string
  parentOnChange?(e: any) : void
}

export function useInputFile({parentOnChange,onFileChange : change, initialUrl = ''}: Props) : UseInputFile {
  const [ file, setFile ] = useState<null| File>( null );
  const [url, setUrl ] = useState<string>(initialUrl);
  const [input, setInput] = useState<HTMLInputElement | null>()
  const setter = (el : null| HTMLInputElement) => {
    if (! input && el){
      setInput(el)
    }
  }


  useEffect(()=>{
    if (file){
      setUrl(URL.createObjectURL(file));
      change(file)
    }
  },[file])
  const control = () => {
    if (input) input.click();
  }
  const onChange = (e: any) => {
    if (e.target.files && e.target.files[0]){
      setFile(e.target.files[0])
    }
    if (parentOnChange){
      parentOnChange(e)
    }
  }
  return [
    {file, control, url},
    {
      onChange,
      ref: setter as any,
    }
  ]
}
