import {Tabs, Tab} from "@mui/material";
import { usePageController } from './page-controller'
import {observer} from "mobx-react";
import {useCheckoutPage} from "@stores/checkout";

const sx = {
  '& .item':{
    textTransform: "none"
  },
  "& .Mui-selected":{
    bgcolor:'secondary.light',
    color:'white!important'
  },
  "& .MuiButtonBase-root":{
    transition : "all ease-in-out 0.2s"
  }
}
export const Controller = observer( () => {
  const [ tab, {to : handleChange} ] = usePageController();
  const store = useCheckoutPage();
  const isDisabled = Boolean(store.transaction || store.loading)
  return (
    <div>
      <Tabs TabIndicatorProps={{
        sx: {
          bgcolor:'transparent',
        }
      } as any} value={tab} sx={sx} onChange={(e: any, v: any)=>handleChange(v)}>
        <Tab disabled={isDisabled} className='item' label='Keranjang belanja'/>
        <Tab disabled={isDisabled} className='item' label='Opsi pengiriman'/>
        <Tab disabled={isDisabled} className='item' label='Pembayaran'/>
        {
          store.transaction ?
            <Tab className='item' label='Tata cara Pembayaran'/> : null
        }
      </Tabs>
    </div>
  );
});
