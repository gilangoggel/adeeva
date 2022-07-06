import {Button, Grid, Tooltip, Box, IconButton} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import {AddShoppingCart, FavoriteBorder, ShoppingBag} from "@mui/icons-material";
import { motion } from 'framer-motion'
import {useProduct} from "@root/provider/product-utils-provider";
import {useSnackbar} from "notistack";
import {observer} from "mobx-react";


export const CardItem = () => {

  return (
    <Grid sm={12} xs={12} item md={4} lg={4} sx={sx} >
      <motion.div {...animation} className="container">
        <div className="wrap">
          <div>
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
  justifyContent:'space-between',
  alignItems: 'center',
  '& > .info':{
    flex: 1,
    "& p:last-of-type":{
      mt: 2,
    }
  },
  '& button':{
    bgcolor:'black',
    borderRadius: 0,
    textTransform: "none",
    fontFamily:"Poppins",
    fontSize: "0.7rem",
    boxShadow:"none",
    fontWeight: "light",
    height: '100%',
    color:'white',
    "&:hover":{
      bgcolor:'primary.main',
      // color:'black',
    }
  },
  "& .cart":{
    flex:1,
  }
}

export const Control = observer( () => {
  const [{name, price} , {addToCart} ] = useProduct();
  return (
    <Box sx={controlSx} className="control">
      <div className='info font-raleway'>
        <p>
          {name}
        </p>
        <p>
          Rp {formatMoney(price)}
        </p>
      </div>
      <Tooltip title='Tambahkan ke keranjang' arrow>
        <IconButton onClick={addToCart}>
          <ShoppingBag/>
        </IconButton>
      </Tooltip>
    </Box>
  )
})

const topSx = {
  display: 'flex',
  alignItems:'center',
  justifyContent: "space-between",
  "& .price":{
    fontSize: "1rem",
    bgcolor:"error.main",
    px:3,
    py:0.5,
    color:'white',
    height: 'fit-content',
    fontWeight:"bolder"
  },
  mb: 1,
  "& button":{
    borderRadius: 0,
  }
}

const Top = observer( () => {
  const [{ price }, {addToWishlist, isWishlistDisabled} ] = useProduct();
  const { enqueueSnackbar } = useSnackbar()
  const handler = () => {
    enqueueSnackbar('Produk di tambahkan ke wishlist')
    addToWishlist();
  }
  const isDisabled = isWishlistDisabled();
  const text = ! isDisabled ? 'Tambahkan ke wishlist' : "Produk ada di wishlist anda";
  return (
    <Box sx={topSx} className='font-poppins'>
      <p className='price'>
        Rp {formatMoney(price / 1000)} k
      </p>
      <Tooltip title={text}>
        <span>
          <IconButton disabled={isWishlistDisabled()} onClick={handler}>
          <FavoriteBorder/>
        </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
})

const Header = () => {
  const [{image, name} ] = useProduct();
  const [,{ navigateToProduct } ] = useProduct();
  return (
    <>
      <Top/>
      <div className='img' onClick={navigateToProduct} style={{
        backgroundImage:`url(${image})`
      }}/>
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
    "&:hover":{
      boxShadow: 5,
    },
    transition: 'all ease-in-out .2s',
    "& > .wrap > div":{
      cursor:"pointer",
      bgcolor:'white',
      p:1,
      "& .img":{
        width: "100%",
        height: 256,
        my:5,
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
