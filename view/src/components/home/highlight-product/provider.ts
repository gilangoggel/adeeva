import {usePage} from "@inertiajs/inertia-react";
import {createContext, useContext, useMemo, useState} from "react";
import { wrap } from 'popmotion'
import { chunk } from 'lodash'

type P = {
  highlightProduct: IProduct[]
}
type IHighlightProvider = ReturnType<typeof useHighlightProductProvider>;

export const Context = createContext<null| IHighlightProvider>(null)
export function useHighlight(){
  return useContext(Context) as IHighlightProvider
}

export function useHighlightProductProvider(){
  const {highlightProduct} = usePage().props as unknown as P;
  const chunked = useMemo(()=>chunk(highlightProduct, 2), []) ;
  const [selected, setSelected] = useState<number>(0);
  const productIndex = wrap(0, chunked.length, selected);
  const paginate = (next: number) => {
    setSelected(productIndex + next)
  }
  return {
    paginate,
    product: highlightProduct[productIndex],
    products: chunked[productIndex],
    control: [productIndex, chunked.length]
  }
}
