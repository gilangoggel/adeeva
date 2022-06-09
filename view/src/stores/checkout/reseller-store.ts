import {Instance, types} from 'mobx-state-tree'
import { productModel } from '@models/product'

const { model, number, string, identifierNumber, array } = types;

export const resellerModel = model({
  id: identifierNumber,
  name: string,
  cityId: string,
  city: string,
  products:array( model({
    product: productModel,
    stock: number,
    product_id: number
  }))
})
export type ResellerStore = Instance<typeof resellerModel['Type']>
