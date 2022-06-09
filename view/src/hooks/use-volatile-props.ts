/**
 * @lib
 */


import {ComponentType, useCallback} from "react";
import { createElement } from 'react'

type PropCallback<T> = () => T

type VolatileProps<T> = PropCallback<T> | T

export function useVolatileProps<T>(volatile : VolatileProps<T>, component: ComponentType<T>){
  const Memoize = useCallback((props: T)=>{
    // @ts-ignore
    const p = typeof volatile === "object" ? volatile : (volatile());
    return createElement(
      component, {
        ...props,
        ...p,
      }
    )
  }, [volatile]);
  return Memoize;
}
