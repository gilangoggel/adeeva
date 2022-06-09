import axios from 'axios'
import { ResellerInfo } from './types'

export class CheckAvaibility{
  products : number[] = []

  setProductIds = (ids: number[]) => {
    this.products = ids;
  }

  dispatch = () : Promise<ResellerInfo[]> => {
    return axios.post('checkout/reseller-list',{
      products: this.products
    }).then(response=>response.data.resellers as ResellerInfo[])
  }
}
