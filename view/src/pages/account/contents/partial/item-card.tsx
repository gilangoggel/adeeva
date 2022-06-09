import {Box, Divider} from "@mui/material";
import {ITransactionItem} from "@models/transaction-extended/item";
import {formatMoney} from "@utils/format-money";

const sx = {
  "& > .content":{
    display: 'flex',
  },
  "& img":{
    height: 100,
    width: 100,
    borderRadius:2,
    bgcolor:'#f7f7f7',
    mr:2,
  },
  '&:last-of-type':{
    "& .divider":{
      display: 'none'
    }
  }
}


export const ItemCard = ({store : item} : {store: ITransactionItem}) => {
  return (
    <Box sx={sx}>
      <div className='font-raleway content'>
        <img src={item.product.image} alt=""/>
        <div>
          <p style={{fontWeight:"bolder"}} className='font-raleway'>
            {item.product.name}
          </p>
          <small>
            {item.amount} x Rp {formatMoney(item.product.price)}
          </small>
          <p>
            Rp {formatMoney(item.total)}
          </p>
        </div>
      </div>
      <Divider className='divider' sx={{mb:2, mt:1}}/>
    </Box>
  )
}
