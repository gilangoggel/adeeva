import {observer} from "mobx-react";
import { CartItemType } from '@stores/cart-store'
import {createContext, PropsWithChildren, useContext} from 'react'

type Props = PropsWithChildren< {
  store : CartItemType
}>
const Context = createContext<null | CartItemType>(null)
export function useCartItem(){
  return useContext(Context) as CartItemType
}
export const CartItemProvider = observer( ({store, children}: Props) => {
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
});
