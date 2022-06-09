import {Column, ContextAction} from "@components/list-page";
import {ITransaction} from "@models/transaction-extended";
import {ReactNode} from "react";

export type ChilProps = {
  close(): void
  transaction: ITransaction
  action: string
  changeAction(v: string) : void
}

export type Props = {
  columns?: Column<any>[]
  title: string
  actions: ContextAction[]
  children?(props: ChilProps) : ReactNode
}
