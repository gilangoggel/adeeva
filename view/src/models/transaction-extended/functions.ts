import {ITransaction} from "@models/transaction-extended/types";
import axios from "axios";
import { Inertia } from '@inertiajs/inertia'
axios.defaults.withCredentials = true;

type InertiaRequestConfig = {
  method?: "post" | 'put' | 'get',
  url : string
  payload?: Record<string, any>,
}

export const makeInertiaRequest = ({ method = "post", url, payload = {} }: InertiaRequestConfig) => {
  return new Promise((resolve, reject)=>{
    return Inertia[method](url, payload, {
      preserveState: true,
      preserveScroll: true,
      onSuccess(){
        resolve({})
      },
      onError(){
        reject({})
      }
    })
  })
}


export const doResellerCompletion = (model: any, message: string) => {
  return makeInertiaRequest({
    url : `/reseller/transaction/${model.id}/completed`,
    payload: {message}
  })
}
export const doAdminCompletion = (model: any) => {
  return makeInertiaRequest({
    method: "post",
    url: `/admin/transaction/${model.id}/completion`
  })
}
export const doResellerConfirm = (model: any) => {
  return makeInertiaRequest({
    method: "put",
    url : `/reseller/transaction/order/${model.id}`,
  })
}

export const toShipment = async (model: null| ITransaction, trackingNumber : string ) : Promise<any>=>{
  if (! model) return false;
  return makeInertiaRequest({
    method: "post",
    url : `/admin/transaction/update-shipment/${model.id}`,
    payload:{
      trackingNumber
    }
  })
}
export const pushTracking = async (model: any,text :string , isAdmin = true) => {
  const uri = isAdmin ? `/admin/transaction/${model.id}/tracking` : ""
  if (! uri) throw new Error("Implementation for reseller")
  return axios.post(uri, {text} ).then(({data })=>{
    const { id, created_at, text } = data;
    model.pushTracking({
      id,
      created_at,
      text
    })
  });
}
export const checkPaymentStatus = async (self: any, isAdmin = false) => {
  const url = isAdmin ? `/admin/transaction/${self.id}/status`:`/transaction/${self.id}`;
  return makeInertiaRequest({
    method: "get", url
  })
}

export const toShipmentView = (self: any) => {
  return {
    toShipment(trackingNumber: string){
      return toShipment(self, trackingNumber)
    }
  }
}
export const expeditionsMap : Record<string, string> = {
  tiki: "tiki.png",
  jne: "jne.jpg",
  pos: "pos.png"
}
export const expeditionsUrlMap : Record<string, string> = {
  tiki: "https://www.tiki.id/id/tracking",
  jne: "https://www.jne.co.id/id/tracking/trace",
  pos: "https://www.posindonesia.co.id/id/tracking"
}

export function getExpeditionImage( expedition: string ){
  return expeditionsMap[expedition] ?? ""
}
export function getTrackingUrl(expedition: string){
  return expeditionsUrlMap[expedition] ?? ""
}
