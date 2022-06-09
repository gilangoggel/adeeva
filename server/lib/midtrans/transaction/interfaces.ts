
export type CustomerDetail = {
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
}

export type ItemDetail = {
  id: string| number
  /**
   * @info
   * Subtotal | total for a product
   */
  price: number
  name: string
  quantity: number
}

export type IPayload<T extends Record<string, any>> = T & {
  customer_details: CustomerDetail
  item_details: ItemDetail[]
  payment_type: string
  transaction_details:{
    order_id: string| number
    gross_amount: number
  }
}

export type ShipmentInfo = {
  cost: number
  expedition: string
}

export interface ITransaction<T extends Record<string, any> = Record<string, any>> {
  customer_detail : CustomerDetail
  item_details : ItemDetail[]
  payment_type: string
  orderId: string|number
  setOrderId(identifier: string| number): void
  setCustomerDetail(customer: CustomerDetail): void
  setItemDetail(items: ItemDetail[], shippingCost: number | ShipmentInfo) : void
  getData() : IPayload<T>
}
type Action = {
  name: string
  method: string
  url: string
}

export type TransactionReturn<T extends Record<string, any> = Record<string, any>> = T & {
  transaction_id: string
  order_id: string
  gross_amount: string
  payment_type: string
  merchant_id: string
  actions: Action[]
  transaction_status: string
}
