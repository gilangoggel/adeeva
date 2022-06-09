import { IRajaonkirApi } from './types'
import { Locations } from './locations'
import {Cost} from "./cost";
import fetch from 'cross-fetch'


export type Props = {
  mode?: string
  apikey: string
}

const base = 'https://api.rajaongkir.com';

type ResolveOptions = {
  method : string ,
  mode : string
  params: Record<string, any>
  apikey: string
}

const resolve = ({mode, params, method, apikey: key}: ResolveOptions) => {
  const body = new URLSearchParams();
  Object.keys(params).forEach(item=>{
    body.set(item, params[item])
  })
  return fetch(`${base}/${mode}/${method}`, {
    headers:{
      key
    },
    body, method: "post",
  }).then(async response=>{
    const obj = await response.json();
    return obj.rajaongkir.results
  })
}
export class RajaonkirApi implements IRajaonkirApi {
  locations: Locations;
  mode: string
  apiKey : string
  cost: Cost
  constructor({mode = 'starter', apikey}: Props) {
    this.apiKey = apikey;
    this.locations = new Locations(this)
    this.mode = mode;
    this.cost = new Cost(this);
  }
  request = async (method: string,params: Record<string, any> = {}) => {
    params = {
      ...params,
      key: this.apiKey
    }
    return resolve({
      mode: this.mode,
      params,
      method,
      apikey: this.apiKey
    })
  }

}
