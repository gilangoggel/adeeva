import { types, getParent } from 'mobx-state-tree'
import {resellerModel} from "@stores/checkout/reseller-store";
import { userCartStore } from '../cart-store'

const { model, number, string, optional, maybeNull, map, reference, boolean} = types;

const keys = ['cityId', 'address', 'postalCode', 'expedition', 'shipmentCost','name'] as const

export type ShipmentFieldName = typeof keys[number]

const formdata = model({
  cityId: string,
  address: string,
  postalCode: string,
  name: string,
  expedition: maybeNull(string),
}).actions(self=>({
  updateField(name : ShipmentFieldName, v: any){
    Object.assign(self, {
      [name] : v
    })
    const parent = getParent(self) as any;
    if (name === "expedition" && parent.shipmentHasLoaded){
      parent.resetShipmentData();
    }
  },
  updateFields(record: Record<string, any>){
    Object.assign(self, record)
  }
}))

const shipmentInfo = model({
  cost: number,
  courier: string,
  etd: string,
  service: string,
})
export const shipmentModel = model({
  resellerData: optional(map(resellerModel), {}),
  selectedReseller: maybeNull(reference(resellerModel)),
  formData: formdata,
  shipmentInfo: maybeNull(shipmentInfo),
  shipmentHasLoaded: optional(boolean, false),
})
  .actions(self=>({
  resetShipmentData(){
    self.shipmentInfo = null
    self.shipmentHasLoaded = false
  },
  setShipmentInfo(data: any){
    self.shipmentInfo = data;
    self.shipmentHasLoaded = true
  },
  setFormData(fields : Record<string, any>){
    return self.formData.updateFields(fields)
  },
  setSeletedReseller( id :any ){
    self.selectedReseller = id
    self.shipmentHasLoaded = false
    if (id){
      self.formData.updateField('expedition', '')
      self.shipmentInfo= null
    }
  },
}))
