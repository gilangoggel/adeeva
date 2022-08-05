import Profile from "App/Models/Profile";
import Reseller from "App/Models/Reseller";
import 'minifaker/locales/en';
import Transaction from "App/Models/Transaction";
import Product from "App/Models/Product";
import * as minifaker from 'minifaker';
import * as fake from 'minifaker';
import {sumBy} from "lodash";
import voca from "voca";
import {TransactionStatus} from "App/Enums/payment-status";

let products: Product[] = [];

export type TransactionItemGen = {
  productId: number
  transactionId: number
  discount: number
  total: number
  subTotal: number
  amount: number
}
export type MetaDataGen = {
  transactionId: number
  grossAmount: number
  merchant_id: string
  payment_type: "bank_transfer",
  va_numbers: any[],
  actions: [],
  id: string
  status:string
}

type MetaItemsReturn = {
  items: TransactionItemGen[],
  meta: MetaDataGen
}
export const generateMetaAndItems = async (transaction: Transaction) : Promise<MetaItemsReturn> => {
  const items = await transactionItemDataGen(transaction);
  const total = sumBy(items, 'total');
  return {
    items,
    meta: {
      transactionId: transaction.id,
      grossAmount: total,
      merchant_id: 'G553123140',
      payment_type: "bank_transfer",
      va_numbers: [{"bank":fake.arrayElement(["bca", 'bri']) ,
        "va_number": voca(fake.creditCardNumber()).replaceAll("-", "")}],
      actions: [],
      id: fake.uuid.v4(),
      status: "settlement"
    }
  }
}


export const transactionItemDataGen = async (transaction: Transaction) : Promise<TransactionItemGen[]> => {
  if (! products.length){
    products = await Product.query();
  }
  const length = minifaker.number({
    min: 1,
    max: 2
  })
  const current : number[] = []
  const transactionId = transaction.id
  return Array.from({length}).map((_)=> {
    const filtered = products.filter(c=>!current.includes(c.id));
    const product = minifaker.arrayElement(filtered);
    const amount = minifaker.number({min:1, max: 2});
    current.push(product.id);
    return {
      productId : product.id,
      transactionId,
      discount: 0,
      total: product.price * amount,
      subTotal: product.price * amount,
      amount
    }
  });
}
type Return = {
  expedition :string
  trackingNumber:string
  shippingCost: number
  address: string
  postalCode:string
  name: string
  status: string
  customs: any,
  customerId: any
  cityId: any,
  total:0
}

export default function transactionDataGen(profile: Profile, reseller ?: Reseller) : Return {
  const basedata : Return = {
    expedition: 'JNE',
    trackingNumber: "",
    shippingCost:0,
    address: profile.address,
    postalCode: profile.postalCode,
    name: profile.user.name,
    status: reseller ? TransactionStatus.RESELLER_NOTIFIED : TransactionStatus.PAYMENT_CONFIRMED,
    customs: {},
    customerId: profile.userId,
    cityId: profile.cityId,
    total: 0
  }
  if(reseller){
    basedata['resellerId'] = reseller.id;
    basedata['expedition'] = '';
    return basedata;
  }
  return {
    ...basedata,
    shippingCost: 12000
  };
}
