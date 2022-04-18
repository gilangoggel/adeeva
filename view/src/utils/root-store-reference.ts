import type {IMapType, IModelType, Instance} from "mobx-state-tree";
import { rootStore } from '@models/init-root'

const resolveCollection = (name: string) => rootStore[name as keyof typeof rootStore] as Instance<IMapType<any>>

function viewAttribute<T extends IModelType<any, any>> (target: T){
  return (self: any, custom?: string) : T['Type'] | null => {
    const id = custom ?? `${target.name}Id`
    const collection = resolveCollection(target.name);
    const node = collection.get(self[id]) as T['Type'] | null
    return node ?? null
  }
}
function actionAttribute<T extends IModelType<any, any>>(target: T){
  return (self: any, value: any)=>{
    const attribute = `${target.name}Id` as keyof typeof self;
    if (value)
    rootStore.merge(value, target.name);
    self[attribute] = value ? value.id : null;
  }
}
export function rootStoreReference<T extends IModelType<any, any>>(target: T){
  const getter = viewAttribute<T>(target);
  const setter = actionAttribute<T>(target);
  return {getter, setter}
}
