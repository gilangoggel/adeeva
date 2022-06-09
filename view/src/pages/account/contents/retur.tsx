import {TransactionDialog} from "./transaction-dialog/transaction-dialog";
import {TransactionList} from "./partial/transaction-list";
import {observer} from "mobx-react";

export const Retur = observer( () => {
  return (
    <>
      <TransactionDialog/>
      <TransactionList mode='retur' emptyText='Anda belum membuat pengajuan pengembalian barang'/>
    </>
  );
});
