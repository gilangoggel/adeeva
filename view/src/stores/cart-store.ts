import {Instance, types, getParent, onSnapshot, getSnapshot, applySnapshot} from 'mobx-state-tree'
import {createContext, useContext} from "react";
import { sumBy } from 'lodash'

export type CartItemType = Instance<typeof itemModel['Type']>;
export type CartStoreType = Instance<typeof userCartModel['Type']>;
const { model, number, string, identifierNumber, optional, map, reference, maybeNull } = types;
const itemModel = model({
  price: number,
  name: string,
  id: identifierNumber,
  amount: number,
  image: string
}).actions((self)=>({

  increase(){
    self.amount = self.amount + 1
  },
  decrease(){
    const next = self.amount - 1;
    if (next < 1){
      return
    }
    self.amount = next
  },

  setAmount(n: number){
    self.amount = n;
  },
  remove(){
    (getParent(self, 2) as any).remove(self);
  }
})).views(self=>({
  get subTotal(){
    return self.amount * self.price
  },
  deleteHandler(){
    (getParent(self, 2) as any).setToDelete(self);
  }
}))
const userCartModel = model('UserCartModel',{
  stacks: optional(map(itemModel), {}),
  toDelete: maybeNull(reference(itemModel))
})
  .views(self=>({
    get isEmpty(){
      return self.stacks.size === 0
    },
    get total(){
      return sumBy(this.items, 'subTotal')
    },
    get len(){
      return self.stacks.size
    },
    get items() : CartItemType[]{
      return Array.from(self.stacks.values())
    }
  }))
  .actions((self)=>{
    const push = ({id, price, name, image}: IProduct, amount: number) => {
      const find = self.stacks.get(id.toString())
      if (find){
        find.setAmount(amount)
        return;
      }
      self.stacks.put({
        id, price, name, amount, image
      })
    }
    const remove = (model : CartItemType) => {
      self.stacks.delete(model.id.toString())
    }
    const setToDelete = (model: any) => {
      self.toDelete = model;
    }
    const onDeleteCommit = () => {
      if (self.toDelete){
        const model = self.toDelete;
        self.toDelete = null;
        remove(model)
      }
    }
    return {
      push,
      remove,
      setToDelete,
      onDeleteCommit
    }
  })
export const userCartStore = userCartModel.create({});
export const CartContext = createContext<null| CartStoreType>(null);
export function useCart(){
  return useContext(CartContext) as CartStoreType;
}
const driver = window.localStorage;
onSnapshot(userCartStore, ()=>{
  const items= userCartStore.items.map(getSnapshot as any)
  driver.setItem('UserCartModel', JSON.stringify(items))
})

export function applyStoreSnapshoot(){
  const items = driver.getItem("UserCartModel");
  if (! items) return;
  const arr = JSON.parse(items);
  const stacks: Record<string, any> = {};
  arr.forEach((item: any)=>{
    stacks[item.id] = item
  })
  applySnapshot(userCartStore, {
    stacks
  })
}
