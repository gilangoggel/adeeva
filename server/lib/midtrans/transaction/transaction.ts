import type {IPayload,CustomerDetail, ItemDetail, ITransaction, ShipmentInfo, TransactionReturn} from './interfaces'
import { pick } from 'lodash'


const keys = ['transaction_id', 'order_id', 'gross_amount', 'payment_type', 'merchant_id', 'actions', 'transaction_status'];

export abstract class Transaction<T, Response extends Record<string, any> = Record<string, any>> implements ITransaction {

  customer_detail: CustomerDetail;
  item_details: ItemDetail[];
  payment_type: string;
  orderId: number | string;

  setOrderId(identifier: string| number){
    this.orderId = identifier;
  }

  resolveCommonData(data: Record<string, any>, customKeys: string[] = []): TransactionReturn<any>{
    return pick(data, [...keys, ...customKeys]);
  }

  setCustomerDetail(customer: CustomerDetail): void {
    this.customer_detail = customer;
  }

  setItemDetail(items: ItemDetail[], shippingCost: number| ShipmentInfo): void {
    this.item_details = items.map(item=>{
      return {
        ...item,
        price: item.price / item.quantity,
      }
    });
    if (shippingCost){
      if (typeof shippingCost === "object"){
        const { cost, expedition  } = shippingCost as ShipmentInfo
        this.item_details.push({
          id: "shipping-cost", name: `Shipment cost ${expedition}`,
          price: cost,
          quantity: 1
        });
        return;
      }
      this.item_details.push({
        id: "shipping-cost", name: "Shipment cost",
        price: shippingCost,
        quantity: 1
      });
      return

    }
  }

  abstract otherpayload(): T

  abstract resolveResponse(payload: Record<string, any>) : TransactionReturn<Response>

  private getTotal(){
    return this.item_details.reduce((p, n)=>{
      return p + (n.price * n.quantity)
    }, 0);
  }

  getData(): IPayload<T> {
    const other = this.otherpayload();
    return {
      ...other,
      customer_details: this.customer_detail,
      payment_type: this.payment_type,
      item_details: this.item_details,
      transaction_details:{
        order_id: this.orderId,
        gross_amount: this.getTotal()
      }
    };
  }
}
