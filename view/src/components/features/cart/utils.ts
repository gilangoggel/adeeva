import {CartItemType} from "@stores/cart-store";
import voca from "voca";

export const onKeyDownHandler = (store: CartItemType) => {
  return (e: any) => {
    const key = e.key.toLowerCase();
    const map : any = {
      arrowdown: store.decrease,
      arrowup: store.increase
    }
    if (key === "backspace"){
      const split = voca(store.amount.toString()).slice(0,
        store.amount.toString().length - 1
      ).value();
      if (split){
        store.setAmount(parseInt(split))
      }else{
        store.setAmount(1)
      }
      return;
    }
    if (voca(key).isDigit()){
      const digit = e.target.value + key;
      store.setAmount(parseInt(digit));
      return;
    }
    const allowed = ['arrowdown', 'arrowup'];
    if (allowed.includes(key)){
      map[key]()
      return;
    }
  }
}
