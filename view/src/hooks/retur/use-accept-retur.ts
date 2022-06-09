import {useFormRequest} from "../use-form-request";
import {ITransactionRetur} from "../../models/transaction-extended/transaction-retur";
import {SnapshotIn} from "mobx-state-tree";

type Response = SnapshotIn<ITransactionRetur>

export function useAcceptRetur(store: ITransactionRetur) : [null| Response, boolean, ()=>void]{
  const [ response, loading, {run} ] = useFormRequest<SnapshotIn<ITransactionRetur>>({
    path: `/admin/transaction/retur/${store.id}/accept`,
    successMessage : "Pengembalian barang berhasil di setujui"
  })
  const accept = () => run({});
  return [
    response,
    loading,
    accept
  ]
}
