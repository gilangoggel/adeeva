import {observer} from "mobx-react";
import {ITransaction} from "@models/transaction-extended";
import { TransactionContext, useTransactionExtended } from '@components/transaction/context'
import moment from "moment";
import {Box, Paper} from '@mui/material'
import { ProductList } from './product-list'

type P = {
  transaction: ITransaction
}

const Header = () => {
  const transaction = useTransactionExtended();
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', mb:1}} className='font-poppins'>
      <small>
        {transaction.invoiceId}
      </small>
      <small>
        {
          moment(transaction.created_at).format("D MMMM Y")
        }
      </small>
    </Box>
  )
}

export const TransactionDetail = observer( ({transaction}: P) => {
  return (
    <TransactionContext.Provider value={transaction}>
      <Paper sx={{mb:2, p:2, bgcolor:'#fdfdfd', borderRadius:3, boxShadow:1}}>
        <Header/>
        <ProductList/>
      </Paper>
    </TransactionContext.Provider>
  );
});
