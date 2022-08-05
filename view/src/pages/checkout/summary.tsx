import {observer} from "mobx-react";
import {useCart} from "@stores/cart-store";
import {Box, Divider} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import {useCheckoutPage} from "@stores/checkout";
import voca from "voca";

type Props = {
  shipmentCost?: boolean
}

const sx = {
  py:5,
  '& h3':{
    color:'#6c6c6c',
    pt:2,
    mb:2,
  },
  "& .info":{
    py:2,
    "& small":{
      fontWeight:"bolder",
      display: 'block',
      color:'#6c6c6c',
    },
    display: 'flex',
    justifyContent:'space-between'
  }
}




const ShipmentSummary = observer( () => {
  const store = useCheckoutPage().shipment.shipmentInfo;
  if (! store){
    return <></>
  }
  const etd = voca(store.etd).replaceAll("HARI", '').value()
  return (
    <>
      <div className='info font-raleway'>
        <small>
          Onkir pengiriman
        </small>
        <p>
          Rp {formatMoney(store.cost)}
        </p>
      </div>
      <div className='info font-raleway'>
        <small>
          Estimasi
        </small>
        <p>
          {etd} hari
        </p>
      </div>
    </>
  )
})

const TotalInfo = observer( () => {
  const cart = useCart();
  const store = useCheckoutPage().shipment.shipmentInfo;
  const total = cart.total + (store ? store.cost : 0)
  return (
    <div>
      <small className='font-raleway'>
        Total
      </small>
      <p style={{fontWeight:"bolder"}} className='font-raleway'>
        Rp {formatMoney(total)}
      </p>
    </div>
  )
})


export const Summary = observer(({shipmentCost = false}: Props)=>{
  const cart = useCart();
  const sum = cart.items.reduce((r,item)=>{
    return r + item.amount
  }, 0)
  return (
    <Box sx={sx}>
      <h3 className='font-poppins'>
        Ringkasan belanja
      </h3>
      <Divider/>
      <div className='info font-raleway'>
        <small>
          Quantitas
        </small>
        <p>
          {sum} item
        </p>
      </div>
      <div className='info font-raleway'>
        <small>
          Produk
        </small>
        <p>
          {cart.items.length} jenis
        </p>
      </div>
      <div className='info font-raleway'>
        <small>
          Total belanja
        </small>
        <p>
          Rp {formatMoney(cart.total)}
        </p>
      </div>
      {
        shipmentCost ?
          <ShipmentSummary/> : null
      }
      {
        ! shipmentCost ?
          <small className='font-raleway'>
            * Belum termasuk biaya pengiriman
          </small> : null
      }
      <TotalInfo/>
    </Box>
  )
})
