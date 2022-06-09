import { ContentContainer, InfoNodes, useRenderNodes } from './content-container'
import {useMemo} from "react";
import {Box, Typography} from "@mui/material";
import {observer} from "mobx-react";
import { useTransactionExtended } from './context'
import {CopyToClipboard} from "@components/copy-to-clipboard";

export function useShipementInfoNode(){
  const store = useTransactionExtended();

  return useMemo(()=>{
    return [
      {
        label: "Nama", content: <Typography variant='caption'>{store.name}</Typography>
      },
      {
        label: "Kota", content: <Typography variant='caption'>{store.cityName}</Typography>
      },
      {
        label: "Kode pos", content: <Typography variant='caption'>{store.postal_code ?? "-"}</Typography>
      },
      {
        label: "Alamat", content: <Typography variant='caption'>{store.address}</Typography>
      },
      store.tracking_number ? {
        label: "Nomor resi", content: (
          <CopyToClipboard align='right' text={store.tracking_number as string} alertText='Nomor resi disalin'>
            <small style={{fontWeight:"bolder"}} className='font-poppins'>{store.tracking_number}</small>
          </CopyToClipboard>
        )
      } : null,
      store.expedition ? {
        label: "Expedisi pengiriman", content: (
          <Box component='img' sx={{borderRadius:2,height:100, width: 100}} src={store.expeditionImage} alt=""/>
        )
      } : null,
    ].filter(Boolean) as any;
  }, [store])
}
export function useRenderShipmentInfo(){
  return useRenderNodes(
    useShipementInfoNode()
  )
}
export const ShipmentInfo =observer( () => {
  const contents : InfoNodes[] = useShipementInfoNode()
  return (
    <ContentContainer title='Customer & Alamat pengiriman' contents={contents}/>
  );
});
