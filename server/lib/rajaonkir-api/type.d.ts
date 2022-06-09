
declare global {
  namespace NodeJS {
    interface Global {
      rajaonkir: import('./main').RajaonkirApi
    }
  }
}
