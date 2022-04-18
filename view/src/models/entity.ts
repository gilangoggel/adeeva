import { types as t } from 'mobx-state-tree'

export const entityModel = t.model({
  id: t.identifierNumber,
  createdAt: t.string,
  updatedAt: t.maybeNull(t.string)
}).actions(self=>{
  const setProperties = (payload: Record<string, any>) => {
    Object.assign(self, payload)
  }
  return {
    setProperties
  }
})
