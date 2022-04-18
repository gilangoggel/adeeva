import {getSnapshot, Instance, types} from 'mobx-state-tree'
import { productModel } from '@models/product'
import {createContext, useContext} from "react";


const { compose, model, boolean, number, optional, array, string } = types;

export type ItemType = Instance<typeof itemType['Type']>
export type ProductFieldType = Instance<typeof productFieldStore['Type']>

export const Context = createContext<null| ProductFieldType>(null)
export function useProductFieldStore(){
  return useContext(Context) as ProductFieldType;
}
const itemType = compose(productModel, model({
  selected: optional(boolean, false),
  amount: optional(number, 0)
})).actions(self=>({
  toggle(){
    self.selected = ! self.selected;
  },
  makeNotSelected(){
    self.selected = false
  }
}))

export const productFieldStore = model({
  open : optional(boolean, false),
  data: array(itemType),
  search: optional(string, '')
})
  .views(self=>({
    get itemCount(){
      return self.data.filter(item=>item.selected).length
    },
    get itemSnapshoot(){
      return self.data
        .filter(item=>item.selected)
        .map(item=>{
        return getSnapshot(item)
      })
    },
    list(current: number[]){
      return self.data.filter(item=>{
        const isNotIncluded = ! current.includes(item.id);
        if (self.search){
          return isNotIncluded && item.name.toLocaleLowerCase().includes(self.search.toLocaleLowerCase())
        }
        return isNotIncluded
      })
    }
  }))
  .actions(self=>{
    const setSearch = (v: string) => {
      self.search = v
    }
    const reset = () => {
      setSearch("")
      self.data.forEach(item=>item.makeNotSelected())
      self.open = false;
    }
    const toggleDrawer = () => {
      self.open = ! self.open
      if (! self.open){
        setSearch("")
        self.data.forEach(item=>item.makeNotSelected())
      }
    }
    return {
      toggleDrawer,
      setSearch,
      reset,
    }
  })
