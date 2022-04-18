import {usePage} from "@inertiajs/inertia-react";
import {useState} from "react";
import { wrap } from 'popmotion'

type P = {
  highlightProduct: IProduct[]
}

export function useHighlightProductProvider(){
  const {highlightProduct} = usePage().props as unknown as P;
  const [selected, setSelected] = useState<number>(0);
  const productIndex = wrap(0, highlightProduct.length, selected);
  const paginate = (next: number) => {
    setSelected(selected + next)
  }
  return {
    paginate,
    product: highlightProduct[productIndex],
    products: highlightProduct
  }
}
