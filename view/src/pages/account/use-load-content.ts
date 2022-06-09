import { Contact } from './contents/contact'
import { Credential } from './contents/credential'
import { PendingTransaction } from './contents/pending-transaction'
import { Transaction } from './contents/transaction'
import {usePage} from "@inertiajs/inertia-react";
import {ComponentType, Fragment} from 'react'
import { Retur as retur } from './contents/retur'


const map = {
  'pending-payment': PendingTransaction,
  transaction: Transaction,
  credential: Credential,
  contact: Contact,
  retur
}

export function useLoadContent(): ComponentType<any>{
  const {tab} = usePage().props.query as any;
  return (map[tab as keyof typeof map] as any) ?? Fragment;
}
