import {SnapshotIn} from "mobx-state-tree";
import {ITransaction, toCamelObject} from "@models/transaction";

const toSimulator = (href: string) => {
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.click();
  a.remove();
}

const toBankSimulator = () => {
  return toSimulator('https://docs.midtrans.com/en/technical-reference/sandbox-test?id=bank-transfer');
}
const toEmoney = () => {
  return toSimulator(
    'https://docs.midtrans.com/en/technical-reference/sandbox-test?id=e-money'
  )
}

export function paymentSimulator(data: SnapshotIn<ITransaction>){
  const payload  = toCamelObject(data) as typeof data;
  const isBank = ['bank_transfer', 'echannel'].includes(payload.paymentType);
  if (isBank){
    toBankSimulator();
    return;
  }
  toEmoney();
}
