import { checkoutSchema } from 'App/schema/checkout-schema'
import User from "App/Models/User";
import Transaction from "App/Models/Transaction";
import Product from "App/Models/Product";
import type { ItemDetail } from '../../lib/midtrans'
import {sumBy} from "lodash";
import {Midtrans, EMoney, BankTransfer} from "../../lib/midtrans";
import TransactionMeta from "App/Models/TransactionMeta";
import TransactionItem from "../Models/TransactionItem";
import {TransactionStatus} from "App/Enums/payment-status";

type Input = Awaited<ReturnType<typeof checkoutSchema>>;
type Items = Input['items'][number]

export class TrasactionHelper {

  input: Input;
  user: User;
  products : ItemDetail[];
  midtrans: Midtrans;
  mode: "bank_transfer" | "emoney"

  constructor(input: Input, user: User, midtrans: Midtrans) {
    this.input = input;
    this.user = user;
    const { payment } = input;
    this.midtrans = midtrans;
    if (['mandiri', 'bri', 'bca'].includes(payment)){
      this.mode = 'bank_transfer'
    }else{
      this.mode = 'emoney'
    }
  }

  charge = (instance: any) => {
    return this.midtrans.charge(instance)
  }

  commonProps = (transaction: Transaction) => {
    const user = this.user;
    return {
      customer:{
        first_name: user.name, email: user.email, phone: user.profile.phoneNumber
      },
      products: this.products,
      orderId: `order-${user.id}${transaction.id}-${this.input.payment}`,
      shipmentInfo:this.input.shipmentCost ? {
        cost: this.input.shipmentCost,
        expedition: this.input.shipment.expedition as string
      } : 0,
    }
  }

  bankTransfer = (transaction: Transaction) => {
    return this.charge(BankTransfer.initialize({
      ...this.commonProps(transaction),
      bank: this.input.payment,
      echannel : [
        "order", `bill ${transaction.id}-${transaction.customerId}`
      ],
    }))
  }
  emoney = (transaction: Transaction) => {
    return this.charge(EMoney.initialize({
      ...this.commonProps(transaction),
      emoney: this.input.payment as any
    }))
  }
  async  getProductPayload( items: Input['items'] ) : Promise<ItemDetail[]>{
    const products = await Product.query().whereIn('id', items.map(item=>item.id))
    return products.map(product=>{
      const quantity = (items.find(item=>item.id === product.id) as Items).amount;
      return {
        price: product.price * quantity,
        name: product.name,
        id: product.id,
        quantity
      }
    })
  }

  private saveMeta = async (transaction: Transaction) => {
    const cb = this.mode === "bank_transfer" ? this.bankTransfer : this.emoney;
    const meta = await cb(transaction);
    return TransactionMeta.create({
      id: meta.transaction_id,
      transactionId: transaction.id as any,
      merchantId: meta.merchant_id,
      payment_type: meta.payment_type,
      grossAmount: meta.gross_amount,
      billKey: meta.bill_key,
      billerCode: meta.biller_code,
      vaNumbers: (meta.va_numbers ? meta.va_numbers : []),
      actions: (meta.actions ? meta.actions : []),
      aquirer: "",
    });
  }

  run = async () => {
    await this.user.load('profile')
    const userId = this.user.id;
    const { shipment, reseller, shipmentCost, items } = this.input;
    console.log(this.input);
    const { name, cityId, postalCode, expedition, address } = shipment;
    const products = await this.getProductPayload(items);
    this.products = products;
    const total = sumBy(products, 'price') + shipmentCost;
    const transaction = await Transaction.create({
      customerId: userId,
      address,
      name,
      cityId,
      postalCode,
      expedition: expedition ?? "",
      resellerId: reseller ? reseller : undefined,
      shippingCost: shipmentCost,
      total, customs:{}, status: TransactionStatus.WAIT_FOR_PAYMENT
    })
    try {
      await this.saveMeta(transaction);
      await TransactionItem.createMany(
        products.map(item=>({
          productId: item.id as number,
          amount: item.quantity,
          subTotal: item.price * item.quantity,
          total:item.price * item.quantity,
          transactionId : transaction.id,
          discount:0,
        }))
      )
      return transaction;
    }catch (e) {
      console.log("errors : ", e)
      await transaction.delete();
      return e;
    }
  }
}
