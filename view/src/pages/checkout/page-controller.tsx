import {createContext, useCallback, useContext, useState} from 'react';
type UsePageController = [
  number, {
    toCart(): void
    toShipment(): void
    toPayment(): void
    to(n: number): void
  }
]
export const usePageControllerProvider = () : UsePageController => {
  const [tab, setTab] = useState<number>(0);
  const toCart = useCallback(()=>{
    setTab(0)
  }, [])
  const toShipment = useCallback(()=>{
    setTab(1)
  }, [])
  const toPayment = useCallback(()=>{
    setTab(2)
  }, [])
  return  [tab, {
    to: setTab,
    toShipment,
    toCart,
    toPayment
  }]
}
export const PageControllerContext = createContext<null| UsePageController>(null)
export function usePageController(){
  return useContext(PageControllerContext) as UsePageController;
}
