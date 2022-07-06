import {useCallback, useState} from "react";
import {Box, Button} from '@mui/material'
import {Add, Remove, AddShoppingCart, Favorite} from "@mui/icons-material";
import {useProduct} from "@root/provider/product-utils-provider";
import {formatMoney} from "@utils/format-money";
import { qtyFormSx } from './extended-control.styles'
import {observer} from "mobx-react";


const QtyForm = () => {
  const [qty, setQty] = useState(1);
  const [ {price}, {addToChartWithAmount} ] = useProduct();
  const onSubmit = () =>{
    addToChartWithAmount(qty)
  }
  const onAdd = useCallback(() => {
    setQty(p=>p+1)
  },[])
  const onSub = useCallback(() => {
    setQty(p=>{
      if (p-1 === 0){
        return p;
      }
      return p - 1
    })
  },[])
  return (
    <Box sx={qtyFormSx}>
      <small className='title'>
        Quantitas
      </small>
      <div className='control'>
        <Button onClick={onSub} size='small' variant='outlined'>
          <Remove/>
        </Button>
        <div className='view title'>
          {qty}
        </div>
        <Button onClick={onAdd} size='small' variant='outlined'>
          <Add/>
        </Button>
      </div>
      <div className='info'>
        <div className='price'>
          Rp {formatMoney(price * qty)}
        </div>
        <Button onClick={onSubmit} className='btn' variant='contained' color='secondary' component='div'>
          <AddShoppingCart sx={{mx: 'auto'}} />
          <span>
            Tambahkan ke cart
          </span>
        </Button>
      </div>
    </Box>
  )
}



export const ExtendedControl = observer( () => {
  const [ , {addToWishlist, isWishlistDisabled} ] = useProduct();
  return (
    <div className='control'>
      <QtyForm/>
      <Button
        disabled={isWishlistDisabled()}
        fullWidth
        color='secondary'
        variant='contained'
        onClick={addToWishlist}
        sx={{mt: 2, textTransform:"none"}}
        startIcon={
        <Favorite/>
      }
      >
        Tambahkan ke wishlist
      </Button>
    </div>
  );
});
