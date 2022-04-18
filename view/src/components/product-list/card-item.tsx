import {Button, Grid, Tooltip, Box} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import {Favorite, AddShoppingCart} from "@mui/icons-material";
import { motion } from 'framer-motion'
import {useProduct} from "@root/provider/product-utils-provider";


export const CardItem = () => {
  const [,{ navigateToProduct } ] = useProduct();

  return (
    <Grid sm={12} xs={12} item md={4} lg={3} sx={sx} >
      <motion.div {...animation} className="container">
        <div className="wrap">
          <div onClick={navigateToProduct}>
            <Header />
          </div>
          <Control/>
        </div>
      </motion.div>
    </Grid>
  );
};

const animation = {
  initial:{
    opacity: 0
  },
  animate:{
    opacity: 1
  }
}
const controlSx = {
  display: 'flex',
  '& button':{
    borderRadius: 0,
    textTransform: "none",
    fontFamily:"Poppins",
    fontSize: "0.7rem",
    boxShadow:"none",
    height: 30,
    fontWeight: "light"
  },
  "& .cart":{
    flex:1,
  }
}

export const Control = () => {
  const [, {addToWishlist, addToCart} ] = useProduct();
  return (
    <Box sx={controlSx} className="control">
      <Button
        onClick={addToCart}
        startIcon={
          <AddShoppingCart/>
        }
        className='cart' disableFocusRipple color='primary' size='small' variant='contained'>
        Tambahkan ke keranjang
      </Button>
      <Tooltip arrow title='Tambahkan ke wishlist'>
        <Button onClick={addToWishlist} disableFocusRipple sx={{bgcolor:"primary.light"}} size='small' variant='contained'>
          <Favorite/>
        </Button>
      </Tooltip>
    </Box>
  )
}

const Header = () => {
  const [{image, price, name} ] = useProduct();
  return (
    <>
      <div className='img' style={{
        backgroundImage:`url(${image})`
      }}/>
      <div className='font-poppins content'>
        <h5>
          {name}
        </h5>
        <p>
          Rp {formatMoney(price)}
        </p>
      </div>
    </>
  )
}

const sx = {
  display: 'flex',
  justifyContent:['center'],
  "& h5":{
    fontWeight:"light",
    color:'black'
  },
  "& > .container":{
    flex: 1,
    p: 1,
    "& > .wrap > div":{
      cursor:"pointer",
      bgcolor:'white',
      "& .img":{
        width: "100%",
        height: 256,
        backgroundPosition: "center",
        backgroundSize:"contain",
        backgroundRepeat:"no-repeat"
      },
      "& > .content":{
        py:1,
        textAlign:'center'
      }
    },
  },
}
