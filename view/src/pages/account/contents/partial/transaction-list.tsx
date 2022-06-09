import {observer} from "mobx-react";
import { transactionHistory } from '@stores/user/transaction-history'
import { TransactionDetail } from './transaction-detail'
import {Typography, Box, Button} from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import {useEffect} from "react";
import {useToggle} from "@hooks/use-toggle";

const EmptyInfo = observer( ({text, mode}: {text: string, mode : string}) => {
  const isEmpty = !Boolean(transactionHistory.transactions().length);
  if (! isEmpty) return <></>
  return (
    <Box sx={{textAlign:'center'}}>
      <Typography className='font-poppins' sx={{my:3}}>
        {text}
      </Typography>
      {
        mode === "retur" ?
          null : (
            <Button
              startIcon={
                <AddShoppingCart/>
              }
              size='large' sx={{borderRadius:3}} variant='contained' color='secondary'>
              Klik disini untuk mulai belanja
            </Button>
          )
      }
    </Box>
  )
})

type Props = {
  emptyText: string
  mode ?: "pending" | 'complete' | 'retur'
}
export const TransactionList = observer( ( { emptyText, mode = "pending" }: Props) => {
  const items = transactionHistory.transactions();
  const [prepare, toggle] = useToggle(true)
  useEffect(()=>{
    if (mode === "retur"){
      transactionHistory.onlyRetur();
    }else{
      transactionHistory.setType(mode === "pending");
    }
    toggle()
  },[])

  return (
    <div>
      <EmptyInfo mode={mode} text={emptyText}/>
      {
        prepare ? null :items.slice().map(item=>(
          <TransactionDetail transaction={item} key={item.id}/>
        ))
      }
    </div>
  );
});
