import {createContext, useContext, useState} from "react";
type UseAppHeader = [
  Record<'logout' | 'cart' | 'wishlist' | 'notification' | 'user_menu', boolean>,
  (v: keyof UseAppHeader[0], b: boolean) => () => void
];
export const AppHeaderContext = createContext<UseAppHeader| null>(null)
export function useAppHeader() : UseAppHeader {
  const parent = useContext(AppHeaderContext);
  if (parent) return parent;
  const [states, setStates] = useState<UseAppHeader[0]>({
    logout: false,
    cart: false,
    wishlist: false,
    notification: false,
    user_menu: false
  });
  const toggler= (k : keyof typeof states, v : boolean) => {
    return () => {
      setStates({
        ...states,
        [k]: v
      })
    }
  }
  return [states, toggler];
}
