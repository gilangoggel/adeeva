import * as React from 'react';
import {Box, TextField, MenuItem} from "@mui/material";
import { usePaginator } from '@stores/paginator'
import {observer} from "mobx-react";
import { useQuery } from './query-provider'
import {useIsSm} from "@hooks/use-is-sm";
import { useAfterSubmit } from './layout'

const sx = {
  position: ['static','sticky'],
  top: 0,
  left: 0,
  py: [0,2],
  px: 1,
  display: ['block','flex'],
  justifyContent:"space-between",
  alignItems:"center",
  bgcolor:'white',
  zIndex: (t: any)=>t.zIndex.appBar+ 100,
  "& .field-container":{
    display:['none', 'block']
  }
}
const orders = [
  {
    value: "name", label: "Nama"
  },
  {
    value: "lowest_price", label: "Harga terendah"
  },
  {
    value: "highest_price", label: "Harga tertinggi"
  },
]

export const OrderField = () => {

  const [{order}, {changeOrder}] = useQuery()
  const afterSubmit = useAfterSubmit();
  const onChange = (e: any) => {
    changeOrder(e.target.value)
    afterSubmit();
  }
  const isSm = useIsSm()

  return (
    <div className='field-container'>
      <TextField
        fullWidth={isSm}
        onChange={onChange}
        InputProps={{
          disableUnderline:true
        }}
        variant='filled'
        label='Urutkan berdasarkan'
        sx={{minWidth:300}}
        size='small'
        select
        value={order}
      >
        {
          orders.map(item=>(
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))
        }
      </TextField>
    </div>
  )
}

export const PaginatorInfo = observer( () => {

  const store = usePaginator<any>()

  return (
    <Box sx={sx as any}>
      <p className='font-poppins'>
        {
          store.meta.total === 0 ?
            "Hasil pencarian tidak di temukan" : `Menampilkan ${store.meta.total} produk`
        }
      </p>
      <OrderField/>
    </Box>
  );
});
