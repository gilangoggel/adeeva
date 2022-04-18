// @flow
import * as React from 'react';
import {Drawer} from "@mui/material";
import { UseResellerOrderDetail, ComponentProps } from './types'
import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo} from "react";
import { resellerOrderPageModel, applyEntitySnapshot } from '@models/reseller-order'
import {observer} from "mobx-react";

const Context = createContext<null| UseResellerOrderDetail >(null)
export function useResellerOrder(){
  return useContext(Context) as UseResellerOrderDetail;
}
export const Hoc = observer( ({ entity, children, setter }: PropsWithChildren<ComponentProps>) => {
  console.log(entity)
  const store = useMemo(()=>{
    return resellerOrderPageModel.create({
      data: [], loading: false, mode: "detail", entity: null
    })
  }, []);
  useEffect(()=>{
    if (entity){
      applyEntitySnapshot(
        store,entity
      )
    }
  }, [entity]);
  const handleClose = useCallback(()=>{
    store.setEntity(null)
    setter(null);
  },[store])

  const getContext = () : UseResellerOrderDetail => {
    return [
      {
        data : store.data,
        mode : store.mode as any,
        entity : store.entity,
      },
      {
        fetch: store.fetch,
        changeMode:store.changeMode,
        handleClose
      }
    ]
  }

  return (
    <Drawer
      PaperProps={{
        sx:{
          minWidth:500
        }
      }}
      anchor='right'
      open={Boolean(store.entity)}
      onClose={handleClose}
    >
      {
        store.entity ?
          <Context.Provider value={getContext()}>
            {children}
          </Context.Provider>
          : null
      }
    </Drawer>
  )
})
