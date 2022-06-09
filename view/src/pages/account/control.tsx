import * as React from 'react';
import { useAccount } from './hoc'
import {Tab, Tabs, Theme} from '@mui/material'

const tablists = [
  {
    value: "account",
    label: "Akun anda"
  },
  {
    value: "purchase-history",
    label: "Riwayat transaksi"
  },
  {
    value: "setting",
    label: "Pengaturan"
  },
];

const sx={
  "& .Mui-selected":{
    bgcolor:'white',
    borderTopLeftRadius:(t: Theme)=>(t.shape.borderRadius as any) * 3,
    borderTopRightRadius:(t: Theme)=>(t.shape.borderRadius as any),
  }
}

export const Control = () => {
  const [{tab}, {changeTab} ] = useAccount();
  return (
    <Tabs TabIndicatorProps={{
      sx:{
        bgcolor:"primary.light"
      }
    } as any} value={tab} sx={sx} onChange={(e: any, v)=>changeTab(v)}>
      {
        tablists.map(item=>(
          <Tab {...item} sx={{textTransform:"none"}} key={item.value}/>
        ))
      }
    </Tabs>
  );
};
