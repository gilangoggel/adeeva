import {useForm} from "@inertiajs/inertia-react";
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {useSnackbar} from "notistack";

interface FieldUtility <T> {
  callback:(name: keyof T, value: any)=>void
  errors: Record<string, any>
  disabled: boolean
  data: any
  resetError(name: string) : void
}

function useFieldUtility<T>({ errors, callback, disabled, data, resetError }: FieldUtility<T>){
  const onChange = (name: keyof T, isEvent = true) => (e: any) => {
    if (errors[name as any]){
      resetError(name as any)
    }
    if (isEvent){
      callback(name, e.target.value)
      return;
    }
    callback(name, e)
  }
  return useCallback((name: keyof T, isEvent = true) => ({
    onChange: onChange(name, isEvent),
    name,
    helperText: errors[name as any],
    error: Boolean(errors[name as any]),
    disabled,
    value: data[name] ?? undefined
  }), [errors, data])
}

type Config = {
  method?: "post" | "put"
  successMessage?: string
  onSuccess?(): void
  disableSnackbar?:boolean
}

export function useFormUtils<T>(initialValue: any, config : Config = {}) : UseFormUtils<T>{
  const { disableSnackbar = false ,method = "post", successMessage = "Data berhasil di simpan", onSuccess : configOnSuccess } = config
  const { data, setData, processing, errors, submit, clearErrors } = useForm(initialValue);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setLoading(processing)
  }, [processing])
  const fieldUtility = useFieldUtility<T>({
    errors,
    callback: setData,
    disabled: processing,
    data,
    resetError: clearErrors as any,
  })
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = useCallback( () => {
    if (! disableSnackbar){
      enqueueSnackbar(successMessage,{
        variant: "success"
      })
    }
    if (configOnSuccess){
      configOnSuccess();
    }
    const scroll = Array.from(document.getElementsByClassName("wrap"));
    if (scroll){
      scroll.forEach((el=>{
        el.scrollTo({
          top: 0,
          behavior:"smooth",
          left:0
        })
      }))
    }
  },[successMessage]);

  const submitOptions = {
    onSuccess,
    forceFormData: true,
    preserveState: true,
    preserveScroll: true,
  }
  const onSubmit = useCallback( (url: string) => (e: any) => {
    e?.preventDefault();
    if (method === "put"){
      url = `${url}?_method=PUT`;
      return submit('post' as any, url, submitOptions)
    }
    submit('post' as any,url, submitOptions as any)
  },[data, method])
  return {
    data,
    fieldUtility,
    loading,
    onSubmit,
    errors,
    setData,
  }
}
export interface UseFormUtils<T> {
  data: T,
  fieldUtility: (name: keyof T, isEvent?:boolean) =>any,
  loading: boolean,
  onSubmit: (path: string) => (e: any)=>void
  errors: Record<keyof T, string>
  setData(name: keyof T, value: any) : void
}
export const FormUtilsProvider = createContext<null| UseFormUtils<any>>(null)
export function useFormUtilProvider<T>(){
  return useContext(FormUtilsProvider) as UseFormUtils<T>;
}
