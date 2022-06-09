import * as React from 'react';
import {ITransaction} from "@models/transaction-extended";
import {Grid, Button, List, ListItem, ListItemText, ListItemIcon} from '@mui/material'
import {useMemo} from "react";

type Props = {
  transaction: ITransaction
}

const sx ={
  textAlign: 'center',
  py: 5,
  "& img":{
    width: '80%',
  }
}
const gopayText = [
  'Klik tombol bayar dengan gopay / scan menggunakan qr-code',
  "Aplikasi gopay akan terbuka",
  "Masukan pin anda",
  "Transaksi berhasil",
  "Kemuadia klik tombol update status pembayaran"
];
const shoppeeText = [
  'Klik tombol bayar dengan shopee pay',
  "Aplikasi shopee akan terbuka",
  "Cek detail transaksi",
  "Tekan bayar",
  "Masukan pin anda",
  "Transaksi berhasil",
  "Kemuadia klik tombol update status pembayaran"
];


export const Header = ({transaction}: Props) => {
  const meta = transaction.meta;
  const isGopay = meta.payment_type === "gopay"
  const qrImage = () => {
    if (meta.payment_type === "gopay"){
      return meta.actions[0].url
    }
    return ""
  }
  const hrefLink = useMemo(()=>{
    if (isGopay){
      return meta.actions[1].url
    }
    return meta.actions[0].url;
  }, [isGopay])
  return (
    <Grid sx={sx} justifyContent='center' className='font-raleway' container>
      <Grid item xs={12} md={6}>
        <p>
          Jumlah pembayaran
        </p>
        <h1>
          Rp {meta.gross_amount}
        </h1>
        <Button href={hrefLink} target='_blank' variant='contained' sx={{my:5}}>
          Buka aplikasi {isGopay ? "gopay" : "shopee"}
        </Button>
        <List dense>
          {
            (meta.payment_type === "gopay" ? gopayText : shoppeeText).map((item)=>(
              <ListItem key={item}>
                <ListItemIcon sx={{minWidth: 15}}>
                  <small>
                    -
                  </small>
                </ListItemIcon>
                <ListItemText primary={item}/>
              </ListItem>
            ))
          }
        </List>
      </Grid>
      {
        isGopay ?
          <Grid item xs={12} md={6}>
            <img src={qrImage()} alt=""/>
          </Grid> : ""
      }
    </Grid>
  );
};
