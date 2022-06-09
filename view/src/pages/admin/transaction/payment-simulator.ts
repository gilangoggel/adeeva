import {SnapshotIn} from "mobx-state-tree";
import {ITransaction, toCamelObject} from "@models/transaction";

const toBankSimulator = () => {
  const href = 'https://docs.midtrans.com/en/technical-reference/sandbox-test?id=bank-transfer';
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.click();
  a.remove();
}

export function paymentSimulator(data: SnapshotIn<ITransaction>){
  const payload  = toCamelObject(data) as typeof data;
  const isBank = ['bank_transfer', 'echannel'].includes(payload.paymentType);
  if (isBank){
    toBankSimulator();
  }
}
