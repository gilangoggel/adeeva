
declare module "midtrans-client"{

  type ConstructorOption = {
    isProduction?: boolean
    serverKey: string
    clientKey: string
  }

  export class Transaction{
    status(id: string) : Promise<any>
  }

  export class CoreApi{
    constructor(_props : ConstructorOption) {}
    transaction: Transaction;
    charge<T>(params: Record<string, any>) : Promise<T>
  }
}
