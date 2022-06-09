import {productPaginator} from "@models/product";
import {createContext} from "react";

export const store = productPaginator.create({});

export type ILayout = {
  toggler(): void
}
type PriceRange = Record<'max' | 'min', number>

export type AvailableQuery = {
  price: PriceRange
  keyword: string
  category: string,
  order: string
};
export type QueryAction = {
  changePrice(n: number[]) : void,
  changeOrder(v: string) : void
  changeCategory(v: string): void
  changeKeyword(v: string): void
  paginate(n: number) : void
}
export type UseQuery = [AvailableQuery, QueryAction];

export const QueryContext = createContext<null| UseQuery>(null);
export const LayoutContext = createContext<null| ILayout>(null);
