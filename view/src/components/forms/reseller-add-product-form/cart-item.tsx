import * as React from 'react';
import { ProductItem } from '@stores/add-product-store'
import {observer} from "mobx-react";
import {Box, TableRow, TableCell, Button, ButtonGroup, IconButton} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import {ReactNode, useCallback} from "react";
import {Add, Delete, Remove} from "@mui/icons-material";

type Props = {
  store : ProductItem
}


type Info = {
  label: string,
  value: ReactNode
}

const makeInfo = (store : ProductItem) : Info[] => [
  {
    label: "Harga",
    value: `Rp ${formatMoney(store.product.reseller_price)}`
  },
  {
    label: "Jumlah",
    value: `x ${store.amount}`
  },
  {
    label: "Quantitas produk",
    value: `${store.quantity} pcs`
  },
]

const AmountControll = observer( ({store}: Props) => {
  const onAdd = useCallback(store.increase, [])
  const onRemove = useCallback(store.decrease, [])


  return (
    <ButtonGroup size='small' variant='text' fullWidth sx={{alignItems:'center'}}>
      <Button onClick={onAdd} sx={{flex:0, borderRight:"none!important"}}>
        <Add/>
      </Button>
      <div style={{flex: 1, textAlign:'center'}}>
        <p>{
          store.amount
        }</p>
      </div>
      <Button sx={{flex:0}} onClick={onRemove}>
        <Remove/>
      </Button>
    </ButtonGroup>
  )
})

const nameSx = {
  display: 'flex',
  '& img':{
    width: 42,
    height: 42,
    borderRadius:'50%',
  },
  "& p":{
    px: 1
  },
  alignItems:'center'
}

export const CartItem = observer( ({  store  }: Props) => {
  const infos : Info[] = makeInfo(store)
  return (
    <TableRow>
      <TableCell sx={{width: 300, fontWeight:"bolder"}} className='font-poppins'>
        <Box sx={nameSx}>
          <img src={store.product.image} alt=""/>
          <p>
            {store.product.name}
          </p>
        </Box>
      </TableCell>
      <TableCell sx={{width: 100}} >
        <AmountControll store={store}/>
      </TableCell>
      <TableCell sx={{width: 30}}>
        x { store.product.pax } pcs
      </TableCell>
      <TableCell sx={{width: 100}} align='right'>
        Rp {formatMoney(store.product.reseller_price)}
      </TableCell>
      <TableCell sx={{width: 100}}>
        Rp {formatMoney(store.subTotal)}
      </TableCell>
      <TableCell sx={{width: 50}} >
        <IconButton color='error' onClick={()=>store.remove()}>
          <Delete/>
        </IconButton>
      </TableCell>
    </TableRow>
  );
});
