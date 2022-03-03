import { types } from "mobx-state-tree";
import { cartItem } from "./cart-item";
import { sumBy } from "lodash";

export const cart = types
  .model({
    items: types.array(cartItem),
  })
  .actions((self) => {
    const push = (data: any) => {
      const has = self.items.find((current) => current.id === data.id);
      if (has) {
        has.setAmount(data.amount);
        return;
      }
      self.items.push({
        id: data.id,
        price: data.price,
        amount: data.amount,
        name: data.name,
        image: data.image,
      });
    };
    const clear = () => {
      self.items.clear();
    };
    const remove = (id: any) => {
      self.items.remove(id);
    };
    return { push, clear, remove };
  })
  .views((self) => ({
    count() {
      return sumBy(self.items, "amount");
    },
    has(id: number) {
      return self.items.find((item) => {
        return item.id === id;
      });
    },
    get total() {
      return sumBy(self.items, "total");
    },
  }));
