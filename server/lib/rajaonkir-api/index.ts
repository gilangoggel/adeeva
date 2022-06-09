export { RajaonkirApi, Props as RajaOnkirProps } from './main'
import { RajaonkirApi, Props } from './main'

export function initRajaOnkir(config: Props) : RajaonkirApi {
  // if (global.rajaonkir){
  //   return global.rajaonkir
  // }
  const instance = new RajaonkirApi(config);
  global.rajaonkir = instance;
  return instance;
}
