import {ITransaction} from "@models/transaction-extended";
import { useFormValues, UseFormValueReturn } from '@hooks/use-form-values'
import {useFormRequest} from "@hooks/use-form-request";
import {SnapshotIn} from "mobx-state-tree";
import {ITransactionRetur} from "@models/transaction-extended/transaction-retur";
import {createContext, useContext} from "react";


type Input = {
  reason: string,
  photo: File|null
}
type FormValues = UseFormValueReturn<Input>
export type UseCreateRetur = [
  SnapshotIn<ITransactionRetur>| null,
  {
    onChange:FormValues[1],
    onSubmit(): void
  }
];
export const FormContext = createContext<null| UseCreateRetur>(null);

export function useCreateRetur(transaction?: ITransaction): UseCreateRetur {
  const parent = useContext(FormContext);
  if (parent) return parent as UseCreateRetur;
  const [ response , loading, {getError, run} ] = useFormRequest<SnapshotIn<ITransactionRetur>>({
    path: `/transaction/retur/${(transaction as any).id}`,
    successMessage: "Pengajuan akan segera diproses"
  });
  const [values, onChange] = useFormValues<Input>({
    getError,
    loading,
    initial:{
      reason: '',
      photo : null
    }
  })
  const onSubmit = () => {
    run(values);
  }
  return [
    response,
    {onChange, onSubmit}
  ]
}
