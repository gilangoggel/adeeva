import {useCallback, useState} from "react";

type Action = {
  /**
   *
   * @param v
   * @param delay in second
   */
  toggleCallback(v: boolean, delay?: number) : ()=>void
  inline(v: boolean) : void
}

type UseToggle = [boolean, ()=>void, Action]


export function useToggle(initial = false) : UseToggle{
  const [open, setOpen] = useState(initial);

  const toggle = useCallback( () => {
    setOpen(v=>! v)
  }, []);
  const inlineCallback = useCallback( (v: boolean, delay: number = 0) => {
    return ()=> setTimeout(()=>{
      setOpen(v)
    }, delay ? delay * 1000 : 0)
  }, [])
  return [ open, toggle, {
    toggleCallback: inlineCallback,
    inline: setOpen
  } ]
}
