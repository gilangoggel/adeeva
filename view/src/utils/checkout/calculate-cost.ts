import axios from 'axios'
import {CartStoreType} from "@stores/cart-store";
type Item = {
  id: number
  amount: number
}

export class CalculateCost{

  destination : number | string = 0
  expedition : string = ''
  items: Item[] = []

  setItems = (cart: CartStoreType) => {
    this.items = cart.items.map(item=>({
      id: item.id,
      amount: item.amount,
    }))
  }
  setDestination = (n : number | string) => {
    this.destination = n
  }
  setExpedition = (expedition: string) => {
    this.expedition = expedition
  }

  dipatch = () => {
    return axios.post('/checkout/shipment-cost', {
      products: this.items,
      destination: this.destination,
      expedition: this.expedition
    }).then(response=>response.data)
  }
}
