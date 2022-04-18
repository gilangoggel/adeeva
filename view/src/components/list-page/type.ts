import {ComponentType, ReactNode} from "react";

export interface IListPageAction{
  updateParams(merge: Record<string, any>) : void
  updateSortOrder(sort: string, direction: undefined| "ASC"| "DESC") : void
  onContextMenu(entity : any): (e:any) =>void
  onControlClick(entity : any): (e:any) =>void
  closeContextMenu(): void
}
export interface IListPageState{
  params: Record<string, any>
  sort:undefined| string
  direction: undefined| "ASC"|"DESC"
  contextMenu: null| Record<'x'| 'y', any>
  entity: any | undefined
}
export type IlistPage = [IListPageState, IListPageAction];

export type Column<T extends Record<string, any>> = {
  key: keyof T | string
  title?: string
  type?: 'money' | 'text' | 'number' | 'category' | 'image' | 'status' | 'masked'
  width?: number
  render?(entity: T) : ReactNode
  disableOrder?: boolean
}

type Action = 'delete' | 'edit' | 'show'

export type ColumnProps = {
  config: Column<any>
  entity: Record<string, any>
}

export type Meta = {
  current_page: number
  total: number
  per_page: number
}

export type ContextAction<T = any> = {
  label: string
  action: string
  disabled?(entity: T) : boolean
}

export type ActionList<T = any> = (Omit<ContextAction, 'disabled'> & {
  onClick(): void
  disabled: boolean
})[]

export interface ListPageProps<T extends Record<string, any>> {
  columns: Column<T>[]
  data: T[]
  title: string
  filter: ComponentType<any>
  meta: any,
  disabledAction?: (Action)[]
  onAction?(entity: any,action: Action | string) : void
  customAction?: ContextAction[]
}

export type UseQuery = {
  query: Record<string, any>
  handleChange(name: string): (e: any)=>void
}

export type UseOrder = {
  order: string | undefined
  direction: "ASC" | "DESC" | undefined
  handleChange(order: string, direction?: "ASC" | "DESC") : void
}

export type Callback = (merge: Record<string, any>) => void

export interface UseListPage {
  order: UseOrder
  query: UseQuery
  loading: boolean
  applyQuery(e?: any): void
}
