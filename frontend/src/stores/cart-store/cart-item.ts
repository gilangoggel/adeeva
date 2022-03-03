import { types, Instance } from "mobx-state-tree";

export const cartItem = types
  .model({
    id: types.identifierNumber,
    name: types.string,
    price: types.number,
    amount: types.number,
    image: types.string,
  })
  .actions((self) => ({
    setAmount(amount: number) {
      self.amount = amount;
    },
  }))
  .views((self) => ({
    get total() {
      return self.amount * self.price;
    },
  }));

export type CartItem = Instance<typeof cartItem["Type"]>;
