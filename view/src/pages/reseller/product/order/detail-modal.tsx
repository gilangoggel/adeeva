import * as React from 'react';
import {useEffect, useState} from "react";
import {CircularProgress, Dialog, Box, IconButton, Button, Chip} from "@mui/material";
import axios from 'axios'
import {formatMoney} from "@utils/format-money";
import {Close} from "@mui/icons-material";
import {resellerOrderStatus} from "@utils/reseller-order-status";

type Props = {
  entity: IResellerOrder | null
  handleClose(): void
}
type Data = {
  id: number
  product: IProduct,
  amount: number
  subTotal: number
}

const fetch = (id: string) => axios.get(`${window.location.pathname}/${id}`).then(({data: {payload} })=>{
  return payload as Data[]
})

type ContentProps = {
  entity: IResellerOrder
  data: Data[]
}

const entityContextSx = {
  display: 'flex', "& > div": { width: "50%" }
}

const EntityContent = ({title, value}: {title: string, value: any}) => {
  return (
    <Box sx={entityContextSx}>
      <div>
        <p className='font-poppins'>
          {title}
        </p>
      </div>
      <div>
        <p className='font-poppins'>
          : {value}
        </p>
      </div>
    </Box>
  )
}

const ContentItem = ({ id, product : {name, image}, subTotal, amount }: Data) => {
  return (
    <Box sx={contentItemSx}>
      <div style={{
        backgroundImage:`url(${image})`
      }} className="img-container"/>
      <div className='content font-poppins'>
        <div>
          <p className='head'>
            {name}
          </p>
          <p>
            x {amount}
          </p>
          <p className='head'>
            Sub total
          </p>
          <p>
            Rp {formatMoney(subTotal)}
          </p>
        </div>
      </div>
    </Box>
  )
}

const Content = ({entity, data}: ContentProps) => {
  const { label, color, icon : Icon } = resellerOrderStatus(entity)
  return (
    <Box sx={contextSx}>
      <Box className='title'>
        <h2 className='font-poppins'>
          Detail pesanan
        </h2>
        <IconButton className='icon-button' sx={{color:'white'}}>
          <Close/>
        </IconButton>
      </Box>
      <Box sx={{p: 2}}>
        <Chip className='font-poppins' sx={{mb: 1}} color={color} label={label} icon={<Icon/>} />
        <EntityContent title='Jumlah produk' value={`${entity.productCount} produk`}/>
        <EntityContent title='Biaya' value={`Rp ${formatMoney(entity.total)}`}/>
        <EntityContent title='Jasa pengiriman' value={entity.expedition ?? "-"}/>
        <EntityContent title='Nomor resi pengiriman' value={entity.deliveryReciptNumber ?? "-"}/>
        <Button disabled={!entity.expedition} size='small' color='primary' variant='contained'>
          Traking pengiriman
        </Button>
      </Box>
      <Box sx={{px:2, mb: 2}}>
        {
          data.map(item=>(
            <ContentItem {...item} key={item.id} />
          ))
        }
      </Box>
    </Box>
  )
}

export const DetailModal = ({entity, handleClose}: Props) => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    if (entity){
      setLoading(true);
      setData([])
      fetch(entity.id.toString()).then((payload)=>{
        setLoading(false)
        setData([...payload])
      })
    }else{
      setData([])
    }
  }, [entity])

  return (
  );
};
