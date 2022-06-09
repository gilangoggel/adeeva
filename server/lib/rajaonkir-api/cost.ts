import { IRajaonkirApi } from './types'

type Location = {
  cityId: number | string
}

type CostInformation = {
  service: string
  courier: string
  cost: number
  etd: string
}

type PrepareConfig = {
  weight: number
  destination: Location
  origin: Location
  expedition: string
}

export class Cost{
  origin : Location | null = null;

  destination: Location | null = null;

  weight: number = 0;

  courier: string

  main: IRajaonkirApi;

  constructor(main: IRajaonkirApi) {
    this.main = main
  }

  prepare = ({origin,destination, weight, expedition}: PrepareConfig) => {
    this.destination = destination;
    this.weight = weight;
    this.courier = expedition
    this.origin = origin
  }

  check = async () : Promise<CostInformation| null> => {
    const { origin, weight, courier, destination } = this;
    if (origin && weight && courier && destination){
      return this.main.request('cost',{
        origin: origin.cityId,
        destination : destination.cityId,
        weight,
        courier
      }).then(response=>{
        if (response[0]){
          const { code, name : service, costs: [cost] } = response[0]
          const info  = cost.cost[0]
          return {
            service,
            courier: code,
            cost: info.value,
            etd: info.etd
          }
        }
        return null;
      })
    }
    return null
  }

}
