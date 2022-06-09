import {createContext, useContext} from "react";
import {ITransactionRetur} from "@models/transaction-extended/transaction-retur";

export const Context = createContext<null| ITransactionRetur>(null)
export function useTransactionReturn(){
  return useContext(Context) as ITransactionRetur;
}
