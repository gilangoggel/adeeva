import * as React from 'react';
import {ITransaction} from "@models/transaction-extended";
import {Box, Grid, IconButton, Tooltip} from "@mui/material";
import { ContentCopy } from '@mui/icons-material'
import {useMemo} from "react";

type P = {
  transaction: ITransaction
}

const sx = {
  my: 2,
  border: "solid 1px",
  p:1,
  px: 2,
  borderColor: "#c7c7c7",
  borderRadius: 1,
  textAlign:'center',
  "& img":{
    width: "50%"
  },
  "& .content-container":{
    display: 'flex',
    alignItems :'center'
  },
  "& .content":{
    mb: 3,
    textAlign : 'left',
    color: "#515151",
    "& .title":{
      fontWeight:"bolder",
    }
  }
}

const Info = ({label, value, control}: {label: string, value: any, control?: boolean}) => {

  const onCopy = () => {
    navigator.clipboard.writeText(value);
    alert("virtual account number is copied")
  }

  return (
    <div className='font-poppins content'>
      <small className='title'>
        {label}
      </small>
      <h1>
        {value} {control ?
        <Tooltip title='Copy'>
          <IconButton onClick={onCopy}>
            <ContentCopy/>
          </IconButton>
        </Tooltip>
         : null
        }
      </h1>
    </div>
  )
}

export const VirtualAccountDetail = ({ transaction }: P) => {
  const meta = transaction.meta
  const isMandiri = meta.payment_type === "echannel";
  const imgUrl : string = useMemo(()=>{
    if (isMandiri){
      return "/assets/bank-image/mandiri.png"
    }
    return meta.paymentModeImage;
  }, [isMandiri])
  const {  } = transaction;
  const { va, payment } = useMemo(()=>{
    if (isMandiri){
      return {
        va : meta.bill_key,
        payment: `Rp ${meta.gross_amount}`
      }
    }
    return {
      va : meta.va_numbers[0].va_number,
      payment: `Rp ${meta.gross_amount}`
    }
  }, [transaction, isMandiri])
  return (
    <Box sx={sx}>
      <Grid container>
        <Grid item className='content-container' md={6} xs={12}>
          <div>
            <Info control label='Nomor virtual account' value={va}/>
            <Info label='Jumlah pembayaran' value={payment}/>
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <img src={imgUrl} alt=""/>
        </Grid>
      </Grid>
    </Box>
  );
};
