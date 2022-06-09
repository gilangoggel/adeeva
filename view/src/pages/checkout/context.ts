import {createContext, useContext} from "react";
import { UseCheckout } from './types'

export const CheckoutContext = createContext<null | UseCheckout >(null);
export function useCheckout(){
  return useContext(CheckoutContext) as UseCheckout;
}
