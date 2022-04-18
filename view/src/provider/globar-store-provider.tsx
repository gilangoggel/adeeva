import {useContext, createContext, useMemo} from 'react'
import type { IGlobalStore } from '@stores/global-store';
import { globalStore } from '@stores/global-store'
import {observer} from "mobx-react";


// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const GlobalStoreContext = createContext<IGlobalStore | null>(null)
export function useGlobalStore(){
  return useContext(GlobalStoreContext) as IGlobalStore
}
export const GlobarStoreProvider = observer( ({children,...properties} : any)=> {
  const { props : {auth} } = properties.initialPage;
  const memo = useMemo(()=>{
    const store = globalStore.create();
    if (auth){
      store.setUser(auth)
    }
    return store;
  }, [])
  return (
    <GlobalStoreContext.Provider value={memo}>
      {children}
    </GlobalStoreContext.Provider>
  );
})
