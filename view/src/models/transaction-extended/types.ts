import { metaModel } from './meta'
import { itemModel } from './item'
import { transactionModel } from './transaction'
import {Instance} from "mobx-state-tree";

export interface ITransaction extends Instance<typeof transactionModel['Type']>{}
export interface ITransactionItem extends Instance<typeof itemModel['Type']>{}
export interface ITransactionMeta extends Instance<typeof metaModel['Type']>{}
