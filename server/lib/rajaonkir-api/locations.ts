import { RajaonkirApi } from './main'

export class Locations {

  main: RajaonkirApi

  constructor(main : RajaonkirApi ) {
    this.main = main;
  }

  loadProvices = () => {
    this.main.request('province', {}).then(response=>{
      console.log(response)
    })
  }

}
