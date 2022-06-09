import { types } from 'mobx-state-tree'

const { model, identifierNumber, string } = types;

export const customerModel = model({
  id: identifierNumber,
  name: string,
})
