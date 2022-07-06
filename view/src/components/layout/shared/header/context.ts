import {createContext, useState, useContext, useEffect} from "react";
import {usePage} from "@inertiajs/inertia-react";

export type Anchors = Record<'wishlish' | 'usermenu' | 'cart', null| HTMLButtonElement>;

const initialAchor : Anchors = {
  wishlish: null, cart: null, usermenu: null
}

type GetAnchor = (v: keyof Anchors) => null| HTMLButtonElement;
type AnchorHandler = (v: keyof Anchors) => (e: any) => void
type UseHeader = [GetAnchor, AnchorHandler, ()=>void]
export const HeaderContext = createContext<null | UseHeader>(null)
export function useHeader() : UseHeader {
  const context = useContext(HeaderContext);
  if (context) return context;
  const {url} = usePage()
  const [anchors, setAnchors] = useState<Anchors>(initialAchor);
  const getAnchor: GetAnchor = (name) => (anchors[name]);
  const handler: AnchorHandler = (name) => (e: any) => setAnchors({
    ...anchors,
    [name]: e.target
  });
  const close = () => {
    setAnchors(initialAchor);
  }

  useEffect(()=>{
    close();
  },[url])
  return [
    getAnchor, handler, close
  ]
}
