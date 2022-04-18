import * as React from 'react';
import { ItemType } from '@stores/product-field-store'
import {observer} from "mobx-react";
import {Grid, Paper, Theme} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import {useCallback} from "react";

type Props = {
  item: ItemType
}
const sx = {
  display: 'flex',
  alignItems: 'center',
  py:1,
  cursor:'pointer',
  "& > .content":{
    "& > div":{
      px:1
    }
  },
  img:{
    borderRadius:1
  },
  "&:hover":{
    bgcolor:(t: Theme)=>t.palette.grey.A200
  },
  '&[data-selected="true"]':{
    bgcolor:"primary.main",
    color:'white'
  },
  transition:"all ease .3s"
}

export const Item = observer( ({item}: Props) => {
  const handler = useCallback(item.toggle, [])
  return (
    <Grid container item sx={sx} data-selected={item.selected} onClick={handler} sm={6}>
      <img src={item.image} style={{height: 72, width: 72}} alt=""/>
      <div className="content">
        <div className='font-poppins'>
          <h4>{item.name}</h4>
          <p>Rp {formatMoney(item.reseller_price)}</p>
          <p>Kuantitas</p>
          <p>x {item.pax}</p>
        </div>
      </div>
    </Grid>
  );
});
