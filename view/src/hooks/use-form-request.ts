import axios, {AxiosResponse} from 'axios'
import {useCallback, useEffect, useMemo} from "react";
import {useToggle} from "@hooks/use-toggle";
import {useSnackbar} from "notistack";
import { find } from 'lodash'
type Ref = Record<string, any>

type Config = {
  successMessage: string
  path: string
}

class ErrorPayload {
  constructor( protected response : AxiosResponse) {}

  getMessage(field: string){
    const errors = this.response.data.traces ?
      this.response.data.traces.messages.errors : this.response.data.errors;
    const isFieldInvalid = find(errors, {field})
    if (isFieldInvalid) return isFieldInvalid.message as string
    return "";
  }

  get isInputError(){
    return this.response.status === 422
  }

}

class FormRequest<T> {
  errorPayload : ErrorPayload | null = null

  response: T | null = null

  constructor(protected path: string = "") {}

  run = async (data: Ref | FormData ) => {
    if (! (data instanceof FormData)){
      const form = new FormData();
      Object.keys(data).forEach(item=>{
        form.append(item, data[item as keyof typeof data] as any)
      })
      data = form;
    }
    return axios.post(this.path, data).then(({data})=>{
      this.response = data;
    }).catch(error=>{
      if ('response' in error){
        this.errorPayload = new ErrorPayload( error.response );
      }
    });
  }

}

type UseFormRequest<T> = [
  T| null, boolean ,
  {
    run(v: FormData | Ref) : void
    getError(v: string) : string
    clear(): void
  }
]

export function useFormRequest<T extends Ref = Ref>({ path, successMessage }: Config) : UseFormRequest<T> {
  const request = useMemo(()=>{
    return new FormRequest<T>(path)
  }, [path])
  const [ loading, _, {toggleCallback, inline} ] = useToggle()
  const { enqueueSnackbar } = useSnackbar()
  const clear = useCallback( () => {
    request.response = null;
    request.errorPayload = null;
  },[])
  useEffect(()=>{
    if (request.response)
    enqueueSnackbar(successMessage)
  },[successMessage, request.response])
  const run = (data: FormData | Ref) => {
    inline(true)
    request.errorPayload = null
    request.run(data).finally(toggleCallback(false,1))
  }
  const getError = (name : string) => {
    if (request.errorPayload){
      return request.errorPayload.getMessage(name)
    }
    return ''
  }
  console.log(
    request.errorPayload
  )
  return [request.response, loading, { run, getError, clear

  } ]
}
