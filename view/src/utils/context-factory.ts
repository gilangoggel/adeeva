import {createContext, useContext} from "react";

export function contextFactory<T>(){
  const HookContext = createContext<null| T>(null);
  const Hook = () => {
    return useContext(HookContext) as T
  }
  return {
    Hook,
    HookContext,
  }
}
