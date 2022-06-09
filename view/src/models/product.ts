import { types as t } from 'mobx-state-tree'
import { entityModel } from './entity'
import { makePaginatorStore } from '@stores/paginator'
import {Navigation} from "@utils/navigation";

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

export const productPaginator = makePaginatorStore<typeof productModel>({
  store: productModel,
  callback(params: Record<string, any>) {
    return Navigation.to('toSearch', params)
  }
})
