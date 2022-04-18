import { Column, ListPage, ContextAction } from '@components/list-page'
import {Inertia} from "@inertiajs/inertia";

const columns : Column<IResellerProduct>[] = [
  {
    key: 'product.name', title: "Nama produk"
  },
  {
    key: 'stock', title: "Jumlah stock"
  }
]
/**
 * @todo
 */
const onShow = () => alert('@todo')
const onAdd = (entity: any) => {
  return Inertia.get('/reseller/product/add', {
    product: entity.id
  })
}
const actions : ContextAction[] = [
  {
    label: "Tampilkan transaksi",
    disabled(): boolean {
      return false
    },
    action: "show-transaction"
  },
  {
    label: "Pesan produk ini",
    disabled(): boolean {
      return false
    },
    action: "order-product"
  },
];
const actionMap: Record<string, (v: any)=>void> = {
  ['order-product'] : onAdd,
  ['show-transaction']: onShow
}



export const List = (props: any) => {
  const onAction = (entity: any, action: string) => {
    const cb = actionMap[action];
    cb && cb(entity)
  }
  return (
    <ListPage
      columns={columns}
      onAction={onAction}
      title='Produk anda'
      filter={()=><></>}
      customAction={actions}
      disabledAction={['show', 'delete', 'edit', 'update']}
      {...props.paginator}
    />
  );
};
