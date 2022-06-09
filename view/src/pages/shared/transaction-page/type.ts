import {TabsContent, TabContentCallback} from "@components/drawer-layout/types";
import {ITransaction} from "@models/transaction-extended";
import {Column, ContextAction} from "@components/list-page";

export type TableTypes = 'order'| 'transactions' | 'retur' | 'shipment'

type Content = TabsContent[] | TabContentCallback;

type ContentGetter = (transaction : ITransaction, pageProps?: Record<string, any>) => Content

type FilterTableConfig<T> = (type : T, pageProps: Record<string, any>) => boolean

export type FilterActions = FilterTableConfig<ContextAction>
export type FilterColumns = FilterTableConfig<Column<any>>
export type FilteringCallback<T> = (
  type: TableTypes,
  pageProps: Record<string, any>,
  filtering?: FilterTableConfig<T>
)=> T[]
export type Props = {
  content: ContentGetter
  title: string
  type: TableTypes
  pageProps: Record<string, any>
  filterAction?: FilterActions
  filterColumns?: FilterColumns
}
