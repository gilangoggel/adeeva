import {ComponentType} from "react";
import {ITransaction} from "@models/transaction-extended";

export type ExtendedTransactionComponent = ComponentType<{
  store: ITransaction
}>
