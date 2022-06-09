import {ITransactionRetur} from "@models/transaction-extended/transaction-retur";
import {useFormRequest} from "@hooks/use-form-request";
import {SnapshotIn} from "mobx-state-tree";
import {UseFormValueReturn, useFormValues} from '../use-form-values'
import {createContext, useContext} from "react";

type Input = {
  expedition: string
  trackingNumber: string
}
type FormValues = UseFormValueReturn<Input>
export type UseSendRetur = [
    SnapshotIn<ITransactionRetur>| null,
  {
    onChange:FormValues[1],
    onSubmit(e: any): void,
    loading: boolean
  }
];

export const FormContext = createContext<null| UseSendRetur>(null);

function resolveUrl(model: any, isResend : boolean){
  return ! isResend ?
    `transaction/retur/${(model as any).id}/send` : `transaction/retur/${model.id}/resend`
}

export function useSendRetur(retur?: ITransactionRetur, isResend: boolean = false) : UseSendRetur {
  const parent = useContext(FormContext);
  if (parent) return parent as UseSendRetur;
  const [ response, loading, {run, getError} ] = useFormRequest<SnapshotIn<ITransactionRetur>>({
    path: resolveUrl(retur, isResend),
    successMessage: "Data berhasil disimpan"
  })
  const [values, onChange] = useFormValues<Input>({
    initial:{
      expedition: "",
      trackingNumber : ""
    },
    getError,
    loading
  })
  const onSubmit = (e: any) => {
    e.preventDefault()
    run(values);
  }
  return [response, {onChange, onSubmit, loading}]
}
