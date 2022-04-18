import { types as t } from 'mobx-state-tree'
import { entityModel } from './entity'
const { string, number, model, compose } = t;

export const productModel =compose(entityModel, model({
  name: string,
  price: number,
  reseller_price: number,
  category: string,
  description: string,
  image: string,
  pax: number,
}))
