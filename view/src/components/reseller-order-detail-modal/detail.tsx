import { useResellerOrder } from './hoc'
import {Box, Chip, Divider} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import {resellerOrderStatus} from "@utils/reseller-order-status";
import { Wrapper } from './wrapper'
import { ConfirmForm } from './confirm-form'
import {observer} from "mobx-react";
import {useGlobalStore} from "@root/provider/globar-store-provider";

const sx = {
  "& h3":{
    color: "primary.main",
    fontWeight:"normal"
  },
  "& .detail-item":{
    display: 'flex',
    "& > div":{
      width: "50%"
    },
    my: 1,
    fontFamily:"Poppins"
  }
}

type DetailItemProp = {
  label: string
  value: any
}

const DetailItem = ({label, value}: DetailItemProp) => {
  return (
    <div className='detail-item'>
      <div>
        <p>{label}</p>
      </div>
      <div>
        <p> : {value}</p>
      </div>
    </div>
  )
}

export const Detail = observer( () => {
  const [{entity, data}]  = useResellerOrder();
  const { label, color, icon: Icon } = resellerOrderStatus(entity as any)
  const {user}  = useGlobalStore();
  const items = [
    {
      label: "Total",
      value: `Rp ${formatMoney(entity?.total as number)}`
    },
    {
      label: "Variasi produk",
      value: `${ entity?.productCount } Produk`
    },
    {
      label: "Quantitas",
      value: `${ entity?.productQuantity } pcs`
    },
    {
      label: "Jasa pengiriman",
      value: `${ entity?.expedition ?? "-"}`
    },
    {
      label: "Nomor resi pengiriman",
      value: `${ entity?.deliveryReciptNumber ?? "-" }`
    },
  ]
  return (
    <Wrapper>
      <Box sx={sx}>
        <h3 className='font-poppins'>
          Detail transaksi
        </h3>
        <Divider/>
        <Chip icon={<Icon/>} label={label} color={color} sx={{mt: 2}}/>
        {
          items.map(item=>(
            <DetailItem {...item} key={item.label} />
          ))
        }
        {
          user && entity?.status === "shipment" && user.role === "RESELLER" ?
            <ConfirmForm/> : null
        }
      </Box>
    </Wrapper>
  );
});
