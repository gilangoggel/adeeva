import {getSnapshot, Instance, types} from 'mobx-state-tree'
import { ResellerStore } from './reseller-store'
import { CheckAvaibility } from '@utils/checkout/check-avaibility'
import {createContext, useContext} from "react";
import {ResellerInfo} from "@utils/checkout/types";
import { shipmentModel } from './shipment-store'
import {userCartStore} from "@stores/cart-store";
import { transactionModel as __transaction } from '@models/transaction-extended'
import { intersection, map } from 'lodash'

export type { ShipmentFieldName } from './shipment-store'


const { model, optional, string, maybeNull, boolean} = types;

const checkavaibility = new CheckAvaibility()

const initialFormData = {
  address: "", shipmentCost: 0, cityId: '', name: "", expedition: null, postalCode: ""
}
const initialShipment = {
  resellerData: {},
  selectedReseller: null,
  formData: initialFormData
}

export const checkoutPageStore = model({
  shipment: optional(shipmentModel, initialShipment),
  selectedPayment: optional(string, ""),
  transaction: optional(maybeNull(__transaction), null),
  loading: optional(boolean, false)
}).views(self=>({
  get formdata(){
    return {
      items: userCartStore.items.map(item=>({
        id: item.id,
        amount: item.amount
      })),
      reseller : self.shipment.selectedReseller ?self.shipment.selectedReseller.id: null,
      shipment: getSnapshot(self.shipment.formData) ,
      shipmentCost: self.shipment.shipmentInfo ? self.shipment.shipmentInfo.cost : 0,
      payment: self.selectedPayment
    }
  },
  get isSubmitDisabled(){
    const reseller = self.shipment.selectedReseller;
    const paymentSelected = Boolean(self.selectedPayment);
    if (!reseller){
      return paymentSelected && Boolean(self.shipment.formData.expedition)
    }
    return paymentSelected
  },
  get resellerData(){
    return self.shipment.resellerData
  },
  resellers(products: any[],cityId : any = null){
    const data = Array.from(this.resellerData.values()) as unknown as ResellerStore[];
    const ids = map(products, 'id') as unknown as number[];
    return data.filter(item=>{
      const productIds = map(item.products, 'product_id') as number[];
      const hasAll = intersection(productIds, ids);
      const base = hasAll.length === products.length;
      return cityId ? (cityId.toString() as any) === item.cityId.toString() && base : base
    })
  },
  get selected(){
    const val = self.shipment.selectedReseller;
    if (val){
      return val.id
    }
    return '__adeeva__'
  }
})).actions(self=>{
  const updatePayment = (bank: string) => {
    self.selectedPayment = bank;
  }
  const setResellerData = (resellers: ResellerInfo[]) => {
    resellers.forEach(item=>{
      self.resellerData.put(item as any)
    })
  }
  const updateSelected = (id: any) => {
    if (id === "__adeeva__"){
      id = null
    }
    self.shipment.setSeletedReseller(id);
  }
  const setTransaction = (obj: Record<string, any>) => {
    if (__transaction.is(obj)){
      self.transaction = obj as any;
    }
  }
  const setLoading = (v: boolean) => {
    self.loading = v;
  }
  return {
    setResellerData,
    updateSelected,
    updatePayment,
    setTransaction
  }
})

export type UseCheckoutPage = Instance<typeof checkoutPageStore['Type']>
export const pageStore = checkoutPageStore.create();
export const Context = createContext<null| UseCheckoutPage>(null);
export function useCheckoutPage(){
  return useContext(Context) as UseCheckoutPage;
}

type BootProps = {
  store: UseCheckoutPage,
  products: number[],
  profile: Record<string, any> | null
}
export const boot = async ({store, products, profile}: BootProps) => {
  checkavaibility.setProductIds(products);
  const resellers = await checkavaibility.dispatch()
  store.setResellerData(resellers);
  if (profile){
    const { address, name, cityId, postalCode } = profile;
    store.shipment.setFormData({
      address,
      name,
      cityId: cityId.toString(),
      postalCode
    })
  }
}
