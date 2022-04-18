import * as React from 'react';
import {Box, Divider} from "@mui/material";
import {useProduct} from "@root/provider/product-utils-provider";
import {formatMoney} from "@utils/format-money";
import {ExtendedControl as Control } from '@components/product-list/extended-control'

const sx = {
  display:['block', 'flex'],
  pt: 5,
  '& > .img-container':{
    width: ['100%','60%'],
    minHeight: 512,
    textAlign:'center',
  },
  '& > .content':{
    width: ['100%','40%'],
    display: 'flex',
    flexDirection:"column",
    fontFamily:"Poppins",
    "& > .control":{
      mt: "auto"
    }
  },
  "& img":{
    width: "100%"
  },
  '& h3':{
    fontWeight:"normal",
    textAlign: ['center', 'left']
  },
  '& p':{
    fontWeight:"light"
  }
}

const Content = () => {
  const [ {name, price, description} ] = useProduct()
  return (
    <>
      <div>
        <h3 className=''>
          {name}
        </h3>
        <h3 className=''>
          Rp {formatMoney(price)}
        </h3>
        <p>
          Deskripsi produk
        </p>
        <Divider sx={{my:1}}/>
        <p>
          {description}
        </p>
      </div>
      <Control/>
    </>
  )
}

export const View = () => {

  return (
    <Box sx={sx}>
      <div className="img-container">
        <ImageContainer/>
      </div>
      <div className="content">
        <Content/>
      </div>
    </Box>
  );
};

const ImageContainer = () => {
  const [ {image} ] = useProduct()
  return (
    <div>
      <img src={image} alt=""/>
    </div>
  )
}
