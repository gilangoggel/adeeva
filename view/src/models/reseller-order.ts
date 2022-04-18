import {applySnapshot, Instance, types as t} from 'mobx-state-tree'
import { productModel } from './product'
import axios from "axios";

export type Modes = "detail" | "products" | "update-form"
export type ItemModelType = Instance<typeof itemModel['Type']>;
export type ResellerOrderPageType = Instance<typeof resellerOrderPageModel['Type']>;
export type ResellerOrderType = Instance<typeof resellerOrderModel['Type']>;

const { number, string, maybeNull, boolean, array } = t;
const itemModel = t.model({
  id: t.identifierNumber,
  product: productModel,
  amount: number,
  subTotal: number,
  pax: number,
})

const resellerOrderModel = t.model('ResellerOrder',{
  id: t.identifierNumber,
  resellerId: t.number,
  expedition: maybeNull(string),
  deliveryReciptNumber: maybeNull(string),
  productCount: number,
  productQuantity: number,
  total: number,
  status: string
})

const action = (self: any) => {
  const changeMode = (mode: Modes) => {
    self.mode = mode
  }
  const setEntity = (entity: any) => {
    self.entity = entity;
  }
  const setPayload = (data: any[]) => {
    self.data = data;
    console.log(data)
  }
  const setLoading = (loading: boolean) => {
    self.loading= loading
  }
  return {
    changeMode,
    setEntity,
    setPayload,
    setLoading,
  }
}

const views = (self: any) => {
  const fetch = () => {
    if (self.entity){
      const {id} = self.entity
      self.setLoading(true)
      axios.get(`${window.location.pathname}/${id}`).then(({data: {payload} })=>{
        self.setPayload(payload)
        self.setLoading(false)
      })
    }
  }
  return {
    fetch
  }
}

export const resellerOrderPageModel = t.model({
  entity: maybeNull(resellerOrderModel),
  data: array(itemModel),
  mode: string,
  loading: boolean
})
  .views(views)
  .actions(action)



export function applyEntitySnapshot(store: ResellerOrderPageType, entity: Record<string, any>){
  const snapshot: Record<string, any> = {};
  Object.keys(resellerOrderModel.properties).forEach(key=>{
    snapshot[key] = entity[key]
  })
  console.log(entity)
  store.setEntity(snapshot)
}
