import {observer} from "mobx-react";
import {ITransactionRetur} from "@models/transaction-extended/transaction-retur";
import {useTransactionExtended} from "@components/transaction/context";
import { ReturDetail } from './retur-detail'
import { AcceptForm } from './accept-form'
import {Box} from "@mui/material";
import { Context } from './context'
import { ResendForm } from './resend-form'

type P = {
  store: ITransactionRetur
}



const Node = observer(({store}: P)=>{
  return (
    <Context.Provider value={store}>
      <Box sx={{p:2}}>
        <ResendForm/>
        <AcceptForm store={store} />
        <ReturDetail store={store}/>
      </Box>
    </Context.Provider>
  )
})

export const Info = observer( () => {
  const transaction = useTransactionExtended();
  if (! transaction.retur){
    return <></>
  }
  return (
    <Node store={transaction.retur}/>
  );
});
