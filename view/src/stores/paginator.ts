import {applySnapshot, IModelType, types} from 'mobx-state-tree'
import {createContext, useContext, useEffect} from "react";

const { number, model, array, optional, boolean } = types;
const paginatorStore = model({
  current_page: number,
  per_page: number,
  total: number
})
type Config<T extends IModelType<any, any>> = {
  store: T,
  callback(params: Record<string, any>) : void
}
export function makePaginatorStore<T extends IModelType<any, any>>({ store, callback }: Config<T>){
  return model({
    loaded: optional(boolean, false),
    data: optional(array(store), []),
    meta: optional(paginatorStore, {
      current_page: 0,
      per_page: 0,
      total: 0
    })
  }).actions((self) => {
    const applyQuery = (query: Record<string, any>) => {
      return callback({
        page: 1,
        ...query,
      })
    }
    const go = (n: number, query: Record<string, any> = {}) => {
      return callback({
        page: n,
        ...query
      })
    }
    const next = (query: Record<string, any> = {}) => {
      return go(self.meta.current_page + 1, query)
    }
    const prev = (query: Record<string, any> = {}) => {
      return go(self.meta.current_page - 1, query)
    }
    return {
      go,
      next,
      prev,
      applyQuery
    }
  })
}
type IPaginatorStore = ReturnType<typeof makePaginatorStore>;

export function usePaginatorListener(store: IPaginatorStore["Type"],{paginator} : any){
  useEffect(()=>{
    const { meta, data } = paginator;
    applySnapshot(store, {
      data: [...data],
      meta: {
        per_page: meta.per_page,
        current_page: meta.current_page,
        total: meta.total
      }
    })
  }, [paginator])
}
type UsePaginator<T = any> = IPaginatorStore['Type'] & {
  data : T
}
export const PaginatorContext = createContext<UsePaginator | null>(null)
export function usePaginator<T>(){
  return useContext(PaginatorContext) as UsePaginator<T>
}
