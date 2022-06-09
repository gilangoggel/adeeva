import { TransactionList } from './partial/transaction-list'
import { TransactionDialog } from './transaction-dialog/transaction-dialog'
import {observer} from "mobx-react";

export const PendingTransaction = observer( () => {
  return (
    <>
      <TransactionDialog/>
      <TransactionList emptyText='Saat ini tidak ada transaksi yang menuggu pembayaran'/>
    </>
  );
});
