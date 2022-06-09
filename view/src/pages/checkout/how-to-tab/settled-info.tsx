import {ITransaction} from "@models/transaction-extended";
import {Box, Button} from "@mui/material";
import { CheckCircle } from '@mui/icons-material'
import { Inertia } from '@inertiajs/inertia'

export const SettledInfo = ({transaction}: {transaction: ITransaction}) => {
  const onClick = () => {
    Inertia.get(`/account?tab=transaction&transaction=${transaction.id}`,{},{
      preserveState:true
    })
  }
  return (
    <Box
      className='font-raleway'
      sx={{
        textAlign:'center',
        my: 5
    }}
    >
      <h1>
        Terima kasih pembayaran anda telah berhasil
      </h1>
      <div>
        <CheckCircle sx={{
          color:"secondary.main",
          fontSize:["5rem","10rem"]
        }}/>
      </div>
      <Button onClick={onClick} variant='contained' color='secondary'>
        Klik disini untuk mengecek transaksi anda
      </Button>
    </Box>
  );
};
