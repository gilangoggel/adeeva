import {useContext, createContext, useMemo, useEffect, useState} from 'react'
import type { IGlobalStore } from '@stores/global-store';
import { globalStore } from '@stores/global-store'
import {observer} from "mobx-react";
import axios from "axios";
import {useToggle} from "@hooks/use-toggle";
import { AppLoader } from '@components/app-loader'
import { CheckAuthContext } from './check-auth-provider'
import {NotificationProvider} from "@root/provider/notification-provider";


// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const GlobalStoreContext = createContext<IGlobalStore | null>(null)
export function useGlobalStore(){
  return useContext(GlobalStoreContext) as IGlobalStore
}
export const GlobarStoreProvider = observer( ({children,...properties} : any)=> {
  const { props } = properties.initialPage;
  const { auth } = props;
  const [loading, toggle, {inline, toggleCallback}] = useToggle(true)
  const memo = useMemo(()=>{
    const store = globalStore.create();
    if (auth){
      store.setUser(auth)
    }
    return store;
  }, [auth]);
  const checkAuth = () => {
    if (! memo.user){
      inline(true);
      axios.get('/auth').then(({data})=>{
        inline(false)
        return memo.setUser(data)
      })
        .catch(console.log)
        .finally(toggleCallback(false))
    }else{
      inline(false)
    }
    console.log(memo.user)
  }
  useEffect(()=>{
    if (! memo.user){
      checkAuth();
    }else{
      inline(false)
    }
  },[])
  useEffect(()=>{
    if (auth){
      memo.setUser(auth);
    }
  }, [auth])
  return (
    <GlobalStoreContext.Provider value={memo}>
      <CheckAuthContext.Provider value={checkAuth}>
        <NotificationProvider {...props}>
          {children}
        </NotificationProvider>
        {
          loading ?
            <AppLoader/> : null
        }
      </CheckAuthContext.Provider>
    </GlobalStoreContext.Provider>
  );
})
