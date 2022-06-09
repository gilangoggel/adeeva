import * as React from 'react';
import {ITransaction} from "@models/transaction-extended";
import { Header } from './header'

type Props = {
  transaction: ITransaction
}
export const Emoney = ({transaction} : Props) => {
  return (
    <div>
      <Header transaction={transaction}/>
    </div>
  );
};
