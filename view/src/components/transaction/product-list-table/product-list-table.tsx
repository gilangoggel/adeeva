import {TableFooter,Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import { Header } from './header'
import { Rows } from './rows'
import { Footer} from './footer'
import { TransactionContext } from '../context'
import {observer} from "mobx-react";
import {ITransaction} from "@models/transaction-extended";


type Props = {
  store: ITransaction
}

export const ProductListTable = observer( ({store} : Props) => {
  return (
    <TransactionContext.Provider value={store}>
      <Table>
        <Header/>
        <Rows/>
        <Footer/>
      </Table>
    </TransactionContext.Provider>
  );
});
