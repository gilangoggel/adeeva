import {useCallback, useState} from "react";

type UseButtonToggle = [null| HTMLButtonElement, (e?: any)=>void, ()=> void]

export function useButtonToggle() : UseButtonToggle{
  const [target, setTarget] = useState<null| HTMLButtonElement>(null)
  const toggle = useCallback((e: any)=>{
    setTarget(target ? null: e.currentTarget)
  }, [target])
  const forceClose = () => setTarget(null)
  return [target, toggle, forceClose]
}
