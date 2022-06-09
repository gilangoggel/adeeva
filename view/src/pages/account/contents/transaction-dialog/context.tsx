import {createContext, useContext} from "react";
import {ITransaction} from "@models/transaction-extended";

type ITransactionDialog = [ITransaction, ()=>void]
export const DialogContext = createContext<null| ITransactionDialog>(null)
export function useTransactionDialog(){
  return useContext(DialogContext) as ITransactionDialog
}
