import { listDrawerStore } from "@stores/utility"
import {transactionModel} from "@models/transaction-extended";

const storeModel = listDrawerStore<typeof transactionModel>(
  transactionModel,
  ["info", "tracking"]
)
export const store = storeModel.create({})
