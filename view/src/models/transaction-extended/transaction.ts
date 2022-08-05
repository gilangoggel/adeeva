import {SnapshotIn, types} from 'mobx-state-tree'
import { metaModel } from './meta'
import { itemModel } from './item'
import { customerModel } from './customer'
import { resellerModel } from './reseller'
import { toShipmentView, } from './functions'
import { trackingModel, ITracking } from './tracking'
import { requestViews } from './request-views'
import { computedViews } from './computed-views'
import { transactionReturModel } from './transaction-retur'

const {identifierNumber, model, string, number, maybeNull, optional, array } = types;


export const transactionModel = model({
  meta: metaModel,
  completionMessage: types.optional(types.string, ''),
  trackings : types.optional(types.array(trackingModel), []),
  items: array(itemModel),
  customer: customerModel,
  reseller: maybeNull(resellerModel),
  address: string,
  city_id: string,
  customer_id: number,
  expedition: maybeNull(string),
  id: identifierNumber,
  name: string,
  postal_code: maybeNull(string),
  reseller_id: maybeNull(number),
  shipping_cost: optional(number, 0),
  status: string,
  total: number,
  tracking_number: maybeNull(string),
  updated_at: string,
  created_at: string,
  retur: types.maybeNull(transactionReturModel)
})
  .views(toShipmentView)
  .actions(self=>({
    setAttribute(v:Partial<SnapshotIn<typeof self>>){
      Object.assign(self,v);
    },
    setRetur(v: SnapshotIn<typeof transactionReturModel['Type']>){
      self.retur = v as any;
    },
    pushTracking(track : SnapshotIn<ITracking>){
      self.trackings.push(
        track
      )
    },
    updateState(status : string){
      self.status = status;
    },
    update(data : Partial<SnapshotIn<typeof self>>){
      console.log(data);
      Object.assign(self,data);
    },
  }))
  .views(requestViews)
  .views(computedViews)
