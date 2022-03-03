import { cart } from "./cart";
import { toJS } from "mobx";
import { createContext, useContext } from "react";
import { Instance, onSnapshot, applySnapshot } from "mobx-state-tree";
export type { CartItem } from "./cart-item";
export type ICartStore = Instance<typeof cart["Type"]>;
const driver = window.localStorage;
export const cartStore = cart.create({ items: [] });
export const CartContext = createContext<null | ICartStore>(null);
export function useCartStore(): ICartStore {
  return useContext(CartContext) as ICartStore;
}

const items = driver.getItem("cart");
if (items) {
  const current = JSON.parse(items);
  applySnapshot(cartStore, {
    items: current,
  });
}

onSnapshot(cartStore, () => {
  const items = toJS(cartStore.items);
  driver.setItem("cart", JSON.stringify(items));
});
