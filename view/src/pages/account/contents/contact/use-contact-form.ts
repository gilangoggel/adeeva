import {createContext, useCallback, useContext, useState} from "react";
import {usePage} from "@inertiajs/inertia-react";
import {useAuth} from "@hooks/use-auth";
import {useToggle} from "@hooks/use-toggle";
import { Request } from './request'
import {applySnapshot, getSnapshot} from "mobx-state-tree";
import {useSnackbar} from "notistack";

type Values = {
  cityId: string
  postalCode: string
  phoneNumber: string
  name: string
  picture: string | File
  address:string
};

type OnChange<T extends keyof Values = keyof Values> = (name: T, value: Values[T]) => void;
type FormCallback = {
  onSubmit(v: any) : void
  loading: boolean
}
type UseContactForm = [Values, OnChange, FormCallback];
export function useContactFormProvider() :UseContactForm {
  const { profile } = usePage().props as any;
  const auth = useAuth();
  const [formValues, setFormValue] = useState<Values>(()=>{
    return {
      cityId : profile.cityId,
      postalCode : profile.postalCode,
      phoneNumber : profile.phoneNumber,
      name: auth.name,
      picture: auth.picture,
      address: profile.address
    }
  });
  const [loading,_, {inline}] = useToggle();
  const { enqueueSnackbar } = useSnackbar()
  const onSubmit = () => {
    const request = new Request();
    inline(true)
    request.run(formValues)
      .then(({user, profile})=>{
        applySnapshot(auth as any, user);
        enqueueSnackbar('Profile anda berhasil di ubah')
      })
      .finally(()=>inline(false))
  }
  const onChange = useCallback( <T extends keyof Values = keyof Values>(name: T, value : Values[T]) => {
    setFormValue(prev=>({
      ...prev,
      [name] : value
    }))
  },[]);
  return [formValues, onChange, {loading, onSubmit}];
}
export const ContactFormContext = createContext<null|UseContactForm>(null);
export const useContactForm = () =>useContext(ContactFormContext) as UseContactForm;
export function useContactFormField( context ?: UseContactForm ){
  const [values, change, {loading}] = context ? context : useContactForm();
  const onChange = useCallback((name: keyof Values)=>{
    return (e: any) => change(name, e.target.value)
  }, [])
  return (name: keyof Values)=> {
    return {
      value : values[name],
      onChange: onChange(name),
      disabled: loading
    }
  }
}
