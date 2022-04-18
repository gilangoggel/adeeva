import {Instance, types as t} from 'mobx-state-tree'
import {createContext, useContext} from "react";

const { model, enumeration } = t

const modes = ['paginate', 'list']

type IPublicPageStore = Instance<typeof publicPageStore['Type']>;

export const PublicContext = createContext<IPublicPageStore|null>(null)
export function usePublicStore(){
  return useContext(PublicContext) as IPublicPageStore;
}

export const publicPageStore = model({
  mode: enumeration(modes)
}).actions(self=>{
  const updateMode = (mode: typeof modes[number]) => {
    self.mode = mode
  }
  return {
    updateMode
  }
})
