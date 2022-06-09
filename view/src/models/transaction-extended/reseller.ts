import { types } from 'mobx-state-tree'

export const resellerModel = types.model({
  address: types.string,
  user:types.model({
    id: types.identifierNumber,
    name: types.string,
  })
})
