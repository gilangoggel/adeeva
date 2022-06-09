import {useEffect} from "react";
import {useAuth} from "@hooks/use-auth";
import { TextFieldProps } from '@mui/material'
import {useFormRequest} from "@hooks/use-form-request";
import {useFormValues} from "@hooks/use-form-values";

type Values = Record<'email' | 'password' | 'password_confirmation', string>

type UseCredentialForm = [
  Values, (v: keyof Values)=>TextFieldProps, {loading: boolean, onSubmit():void}
];

type Response= {
  user: IUser
}

export function useCredentialForm() : UseCredentialForm {
  const auth = useAuth()
  const [response, loading, {run, getError}] = useFormRequest<Response>({
    path: "/account/credential",
    successMessage : "Data berhasil diubah"
  })

  useEffect(()=>{
    if (response){
      auth.update({email: response.user.email})
    }
  },[response])
  const [values, onChange ] = useFormValues({
    getError,
    loading,
    initial: {
      email: auth.email,
      password: "",
      password_confirmation: ""
    }
  })
  const onSubmit = () => {
    run(values)
  }
  const inputProps = (name: keyof Values)=>{
    const helperText = getError(name)
    return {
      onChange,
      name,
      value: values[name],
      disabled: loading,
      error:Boolean(helperText),
      helperText,
    }
  }
  return [
    values, inputProps as any, {loading, onSubmit}
  ]
}
