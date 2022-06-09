import {createContext, useContext} from "react";

type UseCheckAuth = () => void

export const CheckAuthContext = createContext<null| UseCheckAuth>(null)
export function useCheckAuth(){
  return useContext(CheckAuthContext) as UseCheckAuth;
}
