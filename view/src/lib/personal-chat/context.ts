import {createContext, useContext} from "react";
import { UseChatProvider } from './types'


type UseChatReturn = UseChatProvider
export const Context = createContext<UseChatReturn|null>(null)
export function useChatProvider(){
  return useContext(Context) as UseChatReturn;
}
