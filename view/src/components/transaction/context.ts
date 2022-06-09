import {ITransaction} from "@models/transaction-extended";
import {createContext, createElement, useCallback, useContext, useEffect} from 'react'
import {usePage} from "@inertiajs/inertia-react";
import {applySnapshot} from "mobx-state-tree";
import { transactionModel } from '@models/transaction-extended'

export const TransactionContext = createContext<null| ITransaction>(null)

const OriginalProvider = TransactionContext.Provider;

const Provider = (props: any) => {
  const { paginator, transactions, transaction } = usePage().props;
  const apply = useCallback( (snapshoot: any) => {
    const ctx = props.value as ITransaction;
    if (ctx && snapshoot){
      if (transactionModel.is(snapshoot)){
        applySnapshot(ctx, snapshoot)
        console.log(
          "Snapshoot updated"
        )
      }
    }
  }, [props.value]);
  useEffect(()=>{
    const ctx = props.value;
    if (transaction && ctx){
      apply(transaction);
    }
  }, [transaction, props.value]);
  useEffect(()=>{
    const ctx = props.value;
    if (transactions && Array.isArray(transactions)){
      const find = (transactions as any[]).find(item=>item.id === ctx.id);
      apply(find);
    }
  }, [transactions, props.value]);
  useEffect(()=>{
    if (paginator){
      const ctx : ITransaction = props.value;
      if (ctx){
        const { data } = paginator as any;
        const find = (data as any[]).find(item=>item.id === ctx.id);
        apply(
          find
        )
      }
    }
  }, [paginator, props.value]);
  return createElement(OriginalProvider, props)
}
TransactionContext.Provider = Provider as any;
export function useTransactionExtended(){
  const ctx = useContext(TransactionContext) as ITransaction;
  return ctx;
}
