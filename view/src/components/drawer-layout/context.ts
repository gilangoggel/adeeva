import { Props, TabsContent } from './types'
import {ComponentType, createContext, useContext, useMemo} from "react";


export const Context = createContext<null| Props>(null)
export function useDrawerProps() : Props {
  return useContext(Context) as Props;
}

type Content = {
  current: boolean
  component: ComponentType<any>
}

function transformToTab<T>(items : TabsContent[]){
  return items.map(item=>{
    const [ tab ] = item
    const isString = typeof tab === "string";
    return {
      label: isString ? tab : tab.label,
      value: isString ? tab : tab.name
    }
  })
}
function transformToComponent(items: TabsContent[], current: string){
  return items.map(item=>{
    const [ name, component ] = item;
    const value = typeof name === "string" ? name : name.name;
    return {
      component,
      current: current === value,
      key: value
    }
  })
}

function useTransformContent(){
  const { contents, tabvalue } = useDrawerProps();
  return useMemo(()=>{
    const  items = typeof contents === "function" ? contents(): contents;
    return transformToComponent(items, tabvalue)
  }, [tabvalue, contents])
}
export function useCurrentComponent() : ReturnType<typeof transformToComponent>[number] {
  const items = useTransformContent();
  return items.find(item=>item.current) as any
}
export function useTabControl(): [Record<'value' | 'label', string>[],string, (e: any, v: any)=>void] {
  const { tabvalue, onSwap, contents } = useDrawerProps();
  const tabs = useMemo(()=>{
    const list = typeof contents === "function"? contents(): contents;
    return transformToTab(list)
  }, [contents])
  const onChange = (e: any, v: any) => {
    onSwap(v);
  }
  return [
    tabs,
    tabvalue,
    onChange,
  ]
}
