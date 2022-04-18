import type {IMapType, Instance} from 'mobx-state-tree';
import { types as t} from 'mobx-state-tree'
import { userModelType } from './user-model.type'

const action = (self: any) => {
  const merge = (entity : Record<string, any>, collectionName: string) => {
    const collection = self[collectionName as keyof typeof self] as Instance<IMapType<any>>;
    collection.put(entity)
  }
  return {
    merge
  }
}

export const rootStoreType = t
  .model('root-store')
  .props({
    user: t.optional(t.late(()=>t.map(userModelType)), {})
  })
  .actions(action)
