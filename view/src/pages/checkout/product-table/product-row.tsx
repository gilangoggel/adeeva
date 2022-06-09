import {useCartItem, AmountControl} from "@components/features/cart";
import {Box,TableRow, TableCell, Avatar, IconButton, Tooltip, Stack, Divider} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {formatMoney} from "@utils/format-money";
import {observer} from "mobx-react";
import {useIsSm} from "@hooks/use-is-sm";

const infocellSx = {
  display: 'flex',
  alignItems:"center!important",
  "& .avatar":{
    mx: [0,2],
  },
  color:"#6d6d6d"
}

const InfoCell = ({hidedelete = false}: {hidedelete?: boolean}) => {
  const store = useCartItem();
  return (
    <Box sx={infocellSx}>
      {
        ! hidedelete ?
          <Tooltip onClick={()=>store.deleteHandler()} title='Hapus dari keranjang belanja' arrow>
            <IconButton size='small'>
              <Delete/>
            </IconButton>
          </Tooltip> : null
      }
      <Avatar src={store.image} className='avatar'/>
      <small className='font-poppins'>
        {store.name}
      </small>
    </Box>
  )
}

const rowSx = {
  "& > div > div":{
    display: 'flex',
    alignItems: "flex-start",
  },
  "& > div":{
    verticalAlign:"middle"
  }
}

const mobileSx = {
  mb: 2,
  color:"#6d6d6d",
  "& p":{
    fontWeight:"bolder"
  },
  "& small":{
    fontSize:"0.7rem"
  }
}

const Mobile = observer( () => {
  const store = useCartItem();
  return (
    <Box sx={mobileSx}>
      <InfoCell hidedelete />
      <Stack justifyContent='space-between' direction='row'>
        <div>
          <Tooltip title='Hapus dari keranjang belanja' arrow>
            <IconButton onClick={()=>store.deleteHandler()} size='small'>
              <Delete/>
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <AmountControl/>
        </div>
      </Stack>
      <Stack justifyContent='space-between' direction='row' className='font-poppins'>
        <div>
          <small>Quantitas</small>
          <p>
            x {store.amount}
          </p>
        </div>
        <div>
          <small>Harga</small>
          <p>
            Rp {formatMoney(store.price)}
          </p>
        </div>
      </Stack>
      <small className='font-poppins'>
        Total
      </small>
      <p className='font-poppins'>
        Rp {formatMoney(store.subTotal)}
      </p>
      <Divider sx={{my:1}}/>
    </Box>
  )
})

export const ProductRow = observer( () => {
  const store = useCartItem();
  const isSm = useIsSm();
  if (isSm){
    return <Mobile/>
  }
  return (
    <TableRow sx={rowSx} component='div'>
      <TableCell component='div'>
        <InfoCell/>
      </TableCell>
      <TableCell sx={{verticalAlign:"top"}} component='div'>
        <div>
          <small>
            Rp {formatMoney(store.price)}
          </small>
        </div>
      </TableCell>
      <TableCell component='div'>
        <AmountControl/>
      </TableCell>
      <TableCell component='div'>
        <div>
          <small>
            Rp { formatMoney(store.subTotal)}
          </small>
        </div>
      </TableCell>
    </TableRow>
  );
});
