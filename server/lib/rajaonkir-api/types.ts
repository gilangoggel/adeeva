import { Locations } from './locations'
import { Cost } from './cost'

export interface IRajaonkirApi {
  request(method: string, params: Record<string, any> ) : Promise<any>
  locations: Locations
  cost: Cost
  apiKey: string
  mode: string
}
