import * as React from "react";
import { createContext, useContext } from "react";
import { IProduct } from "../../types/product";

type Ctx = {
  product: IProduct;
  recomendation: IProduct[];
};

export const ProductPageContext = createContext<null | Ctx>(null);
export function useProductPage(): Ctx {
  return useContext(ProductPageContext) as Ctx;
}
