import type { ComponentProps } from './types'
import {createContext, PropsWithChildren, useContext} from 'react'
import { UseBackOfficeLayout } from './types'
import {Inertia} from "@inertiajs/inertia";
import { routeList } from './route-lists'

function useBackOfficeProvider({mode}: ComponentProps) : UseBackOfficeLayout{

  const root = mode === "admin" ? '/admin' : '/reseller'

  const to = (path: string = '') => {
    return () => {
      Inertia.get(`${root}${path}`)
    }
  }

  return {
    links: routeList(mode),
    to,
    root,
  }
}

const BackOfficeContext = createContext<null| UseBackOfficeLayout>(null)
export function useBackoffice(){
  return useContext(BackOfficeContext) as UseBackOfficeLayout;
}

export const BackOfficeProvider = ({ mode, children } : PropsWithChildren<ComponentProps>) => {
  const ctx = useBackOfficeProvider({mode})
  return (
    <BackOfficeContext.Provider value={ctx}>
      {children}
    </BackOfficeContext.Provider>
  )
}
