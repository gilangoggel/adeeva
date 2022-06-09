import {observer} from "mobx-react";
import {useCheckoutPage} from "@stores/checkout";
import {Button, Menu, Box, Avatar} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useButtonToggle} from "@hooks/use-button-toggle";
import { useShipmentListener } from './use-shipment-listener'
import { LoadingBackdrop } from "@root/components/loading-backdrop";

const items = ['jne', 'tiki', 'pos']

const map : Record<string, string> = {
  tiki: "tiki.png",
  jne: "jne.jpg",
  pos: "pos.png"
}

const itemSx = {
  p: 1,
  '&[data-mode="list"]':{
    p:0
  },
  display: 'flex',
  cursor:"pointer",
  "&:not([data-mode='list']):hover":{
    bgcolor:'#e7e7e7'
  },
  "& small":{
    fontSize:"1rem",
    textTransform:"uppercase"
  },
  alignItems:'center'
}

type ItemProps = {
  type: string
  onClick?() : void
  mode?: "button" | 'list'
}

const Item = ({ type, onClick, mode }: ItemProps) => {
  const src = useMemo(()=>{
    return `/assets/expedition/${map[type]}`
  }, [])
  return (
    <Box
      data-mode={mode}
      onClick={onClick}
      role='button'
      sx={itemSx}
      component='div'
    >
      <Avatar sx={{mr: 3, height: 30, width: 30}} src={src}/>
      <small className='font-raleway'>
        {type}
      </small>
    </Box>
  )
}

export const ExpeditionSelector = observer( () => {
  const store = useCheckoutPage();
  const expedition = store.shipment.formData.expedition;
  const [anchor, toggle, close ] = useButtonToggle()
  const [width, setWidth] = useState<number>(0);
  const loading = useShipmentListener();
  useEffect(()=>{
    if (! width && anchor){
      setWidth(anchor.getBoundingClientRect().width)
    }
  }, [width, anchor]);
  const handleClick = useCallback((v: string)=>{
    return ()=>{
      store.shipment.formData.updateField('expedition', v)
      close()
    }
  }, [])

  return (
    <>
      <LoadingBackdrop open={loading}/>
      <Menu
        onClose={toggle}
        PaperProps={{
          style:{
            opacity: anchor ? 1: 0,
            width
          }
        }}
        open={Boolean(anchor)}
        anchorEl={anchor}
      >
        {
          items.map(item=>(
            <Item type={item} onClick={handleClick(item)} key={item}/>
          ))
        }
      </Menu>
      <Button
        onClick={toggle}
        color='secondary'
        disabled={store.selected !== '__adeeva__'}
        sx={{
          px:2,
          display: 'flex',
          justifyContent:"space-between"
        }}
        endIcon={
          <ArrowDropDown/>
        }
        variant='contained' fullWidth>
        {
          expedition ?
            <Item mode={"list"} type={expedition as string}/> : 'Expedisi pengiriman'
        }
      </Button>
    </>
  )
})
