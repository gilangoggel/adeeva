import { useTransactionExtended  } from '@components/transaction/extended/context'
import {formatMoney} from "@utils/format-money";
import {Box, Button, Grid} from "@mui/material";
import { transactionHistory as store } from '@stores/user/transaction-history'
import { ItemCard as Item } from './item-card'

const Info = ({label, info}: {label: string, info : any}) => {
  return (
    <Box sx={{mb: 1}}>
      <small style={{display:"block"}}>
        {label}
      </small>
      <p style={{fontWeight:"bold"}}>
        {info}
      </p>
    </Box>
  )
}

export function useTransactionItems(){
  const transaction = useTransactionExtended();
  return (
    transaction.items.map((item)=>(
      <Item key={item.id} store={item}/>
    ))
  )
}

export const ProductList = () => {
  const transaction = useTransactionExtended();
  const nodes = useTransactionItems();
  return (
    <Grid container>
      <Grid md={8} sx={{
        borderRight: "solid 1px",
        borderColor:'#e4e4e4'
      }} item>
        <Box sx={{pr:1}}>
          {nodes}
          <Button onClick={store.prepare(transaction)} size='small' fullWidth color='secondary' variant='contained' sx={{borderRadius:2, mt: 3}}>
            Detail transaksi
          </Button>
        </Box>
      </Grid>
      <Grid className='font-raleway' item md={4}>
        <Box sx={{px:1}}>
          <Info label='Total belanja' info={`Rp ${formatMoney(transaction.beforShipping)}`}/>
          <Info label='Onkos kirim' info={`Rp ${formatMoney(transaction.shipping_cost)}`}/>
          <Info label='Total' info={`Rp ${formatMoney(transaction.total)}`}/>
        </Box>
      </Grid>
    </Grid>
  );
};
