import {usePage, useForm, useRemember} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import { Callback, UseOrder, UseListPage } from './type'


function useOrder(cb : Callback) : UseOrder {
  const { query: {order, direction} } = usePage<any>().props;
  const handleChange: UseOrder['handleChange'] = (order, direction = "ASC") => {
    if (! direction){
      cb({
        order: undefined,
        direction: undefined
      })
      return;
    }
    cb({
      order,
      direction
    })
  }
  return {
    order,
    direction,
    handleChange
  }
}

export function useQuery(cb: Callback){
  const { query } = usePage<any>().props;
  const handleChange = (name: string) => {
    return (val: any) => {
      cb({
        [name] : val ? val : undefined
      })
    }
  }
  return {
    query,
    handleChange
  }
}




export function useListPageProvider() : UseListPage{
  const [ queries, setQueries ] = useState<Record<string, any>>({})

  const [ loading, setLoading ] = useState<boolean>(false)

  const callback: Callback = ( merge: Record<string, any> ) => {
    setQueries({
      ...queries,
      ...merge,
    })
  }
  const applyQuery = useCallback( (e?: any) => {
    e && e.preventDefault();
    Inertia.get(window.location.pathname, queries, {
      preserveState: true,
      onSuccess: ()=>setLoading(false),
      onStart:()=>setLoading(false),
      onError:()=>setLoading(false)
    });
  }, [queries])
  const orderCallback = (sort: any) => {
    callback(sort);
    setTimeout(()=>{
      applyQuery();
    }, 500)
  }
  const order = useOrder(orderCallback);
  const queryUtil = useQuery(callback);
  return {
    order,
    query: queryUtil,
    loading,
    applyQuery
  }
}


export const ListPageContext = createContext<UseListPage| null>(null)
export function useListPage(){
  return useContext(ListPageContext) as UseListPage
}
