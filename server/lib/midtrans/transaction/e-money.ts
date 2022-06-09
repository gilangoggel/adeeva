import { Transaction } from './transaction'
import {CustomerDetail, ItemDetail, ShipmentInfo, TransactionReturn} from "./interfaces";

type Providers = 'gopay' | 'shopee_pay'

export type QrisPayload = {
  acquirer: string
}
export type ShoopePayPayload = {
  callback_url: string
}
export type GopayPayload = {
  enableCallback?: boolean
  callback_url?: string
}
export type EmoneyPayload = {
  qris?: QrisPayload,
  shopeepay?: ShoopePayPayload,
  gopay?: GopayPayload
}

type InitializeConfig = {
  emoney: Providers
  customPayload?: GopayPayload | ShoopePayPayload
  products: ItemDetail[],
  orderId: number | string
  shipmentInfo: ShipmentInfo | number
  customer: CustomerDetail
}


export class EMoney extends Transaction<EmoneyPayload> {
  resolveResponse(payload: Record<string, any>): TransactionReturn {
    return super.resolveCommonData(payload)
  }
  static initialize = ({emoney, shipmentInfo, products, customer, orderId, customPayload = {}} : InitializeConfig) => {
    const instance = new EMoney(emoney);
    instance.setOrderId(orderId)
    instance.setItemDetail(products, shipmentInfo)
    instance.setCustomerDetail(customer)
    if (['qris', 'shopeepay'].includes(instance.payment_type)){
      customPayload.callback_url = 'https://midtrans.com/'
    }
    instance.setCustomPayload(customPayload);
    return instance;
  }
  provider : Providers;

  customPayload : GopayPayload | ShoopePayPayload = {};

  constructor(provider :EMoney['provider']) {
    super();
    this.payment_type = provider;
  }

  setCustomPayload = (payload: ShoopePayPayload| GopayPayload) => {
    this.customPayload = payload;
  }

  otherpayload(): EmoneyPayload {
    return {
      [this.payment_type]:this.customPayload
    };
  }
}
