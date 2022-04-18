import {types, getParent, Instance} from 'mobx-state-tree'
import { productModel } from '@models/product'
import {createContext, useContext} from "react";

export type ProductItem = Instance<typeof itemStore['Type']>;
export type AddResellerProductPage = Instance<typeof addProductStore['Type']>

export const Context = createContext<null| AddResellerProductPage>(null);
export function useResellerAddProduct(){
  return useContext(Context) as AddResellerProductPage;
}
const { model, number, identifierNumber, map } = types;
const itemStore = model({
  product: productModel,
  amount: number,
  id: identifierNumber
})
  .views(self=>{
    return {
      get subTotal(){
        return self.product.reseller_price * self.amount
      },
      get quantity(){
        return self.amount * self.product.pax
      }
    }
  })
  .actions(self=>{
    const remove = () => {
      (getParent(self, 2) as any).remove(self.id)
    }
    const increase = () => {
      self.amount = self.amount + 1;
    }
    const decrease = () => {
      if (self.amount !== 1){
        self.amount = self.amount - 1;
      }
    }
    return {
      increase,
      remove,
      decrease,
    }
  });

export const addProductStore = model({
  items: map(itemStore)
})
  .views(self=>{
    return {
      isProductDisabled(id: any){
        return self.items.has(id)
      },
      get toArray(){
        return Array.from(self.items.values());
      },
      get currentItems() : number[]{
        return this.toArray.map(item=>{
          return item.id
        })
      },
      get quantity(){
        return this.toArray.reduce((reducer,item)=>{
          return reducer + item.quantity
        }, 0)
      },
      get isEmpty(){
        return self.items.size === 0
      },
      get total(){
        return Array.from(self.items.values()).reduce((reducer, item)=>{
          return reducer + item.subTotal
        }, 0)
      }
    }
  })
  .actions((self)=>{
    const add = (product: IProduct) => {
      self.items.put({
        id: product.id,
        product,
        amount: 1
      })
    }
    const addMany = (items: any[]) => {
      items.forEach(add)
    }
    const remove = (id : any) => {
      return self.items.delete(id)
    }
    return {add, remove, addMany}
  })
