import {useEffect} from "react";
import {transactionHistory} from "@stores/user/transaction-history";
import {TransactionList} from "./partial/transaction-list";
import { TransactionDialog } from './transaction-dialog/transaction-dialog'
import {observer} from "mobx-react";
import {usePage} from "@inertiajs/inertia-react";

export const Transaction = observer( () => {
  const { query } = usePage().props as any;
  useEffect(()=>{
    if (query && query.transaction){
      const find = transactionHistory.items.find(item=>{
        return item.id === parseInt(query.transaction);
      })
      if (find){
        transactionHistory.setTransaction(find)
      }
    }
  },[])
  return (
    <>
      <TransactionDialog/>
      <TransactionList mode='complete' emptyText='Anda belum melakukan transaksi'/>
    </>
  );
});
