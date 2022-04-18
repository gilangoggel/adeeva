import {observer} from "mobx-react";
import {useGlobalStore} from "@root/provider/globar-store-provider";
import type {ComponentType} from "react";
import { useMemo} from "react";
import {AppMode} from "@stores/global-store";
import { Admin } from './admin'
import { Reseller } from './reseller'
import { User } from './user'

const ComponentMap : Record<AppMode, ComponentType<any>> = {
  [AppMode.ADMIN] : Admin,
  [AppMode.RESELLER]: Reseller,
  [AppMode.USER]: User
}

export const  Layout = observer( ({children}: any) => {
  const store = useGlobalStore();
  const loc = window.location.href;
  if (loc.includes('admin') || loc.includes("reseller")){
    const Node = ComponentMap[store.appmode];
    return (
      <Node>
        {children}
      </Node>
    )
  }
  return (
    <User>
      {children}
    </User>
  );
})
