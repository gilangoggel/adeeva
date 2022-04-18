import * as React from 'react';
import { ListPage, Column } from '@components/list-page'
import { Filter } from './filter'
import {Inertia} from "@inertiajs/inertia";
import {Loader} from "@components/loader";
import {useCallback, useMemo, useState} from "react";
import {DeleteModal} from "@components/modals/delete-modal";
import {useSnackbar} from "notistack";

const config: Column<IProduct>[] =[
  {
    key: "name",
    title: "Nama produk"
  },
  {
    key: "image",
    type: "image",
    title: "Foto produk",
    disableOrder: true
  },
  {
    key: "price",
    type: "money",
    title: "Harga (Customer)"
  },
  {
    key: "reseller_price",
    type: "money",
    title: "Harga (Reseller)"
  },
]


type DeleteActionState<T> = {
  entity: T| null
  open: boolean
  loading: boolean
}
type DeleteAction<T> = {
  openModal(entity: T) : void
  closeModal() : void
  onDelete(): void
}

function useDeleteAction<T>(entityUri: string) : [DeleteActionState<T>, DeleteAction<T>] {
  const [entity, setEntity ] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const state: DeleteActionState<T> = useMemo(()=>({
    entity,
    open: Boolean(entity) && ! loading,
    loading
  }), [loading, entity])
  const { enqueueSnackbar } = useSnackbar();
  const onDelete = useCallback( () => {
    if (entity){
      Inertia.delete(`${entityUri}/${(entity as any).id}`, {
        preserveState: true,
        onSuccess:()=> {
          setLoading(false)
          setEntity(null)
          enqueueSnackbar('Data berhasil di hapus', {
            variant:"success"
          })
        },
        onStart:()=>setLoading(true),
        onError:()=>setLoading(false)
      })
    }
  }, [entity])
  const action : DeleteAction<T> = useMemo(()=>({
    closeModal() {
      setEntity(null)
    },
    openModal : setEntity,
    onDelete
  }), [onDelete])
  return [state, action]
}

export const List = (props: any) => {
  const [ deleteState, deleteAction ] = useDeleteAction<IProduct>(window.location.pathname)

  const onAction = (entity : Record<string, any>, action: string) => {
    const { id } = entity
    const goToEdit = () => Inertia.get(`/admin/product/${id}/edit`);
    if (action === "update"){
      goToEdit();
      return;
    }
    if (action ==="delete"){
      deleteAction.openModal(entity as any);
      return;
    }
  }

  return (
    <>
      <DeleteModal
        open={deleteState.open}
        onConfirmed={deleteAction.onDelete}
        onCancel={deleteAction.closeModal}
      />
      <Loader loading={deleteState.loading}/>
      <ListPage
        filter={Filter}
        title='Data produk'
        columns={config}
        onAction={onAction}
        {...props.paginator as any}
      />
    </>
  );
};
