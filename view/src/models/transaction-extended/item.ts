import {Instance, types} from 'mobx-state-tree'
import { productModel } from '../product'

const { model, identifierNumber, number } = types;

export const itemModel = model({
  id: identifierNumber,
  amount: number,
  discount: number,
  sub_total: number,
  total: number,
  product: productModel
})
export type ITransactionItem = Instance<typeof itemModel['Type']>;
