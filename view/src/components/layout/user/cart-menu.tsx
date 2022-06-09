import {observer} from "mobx-react";
import {Button, Popper, ClickAwayListener, Grow, Paper, Divider} from "@mui/material";
import {useCart, CartItemType} from "@stores/cart-store";
import {formatMoney} from "@utils/format-money";
import {Inertia} from "@inertiajs/inertia";

type Props = {
  handleClose(): void
  target: HTMLButtonElement| null
}

const Header = observer( ({ onClose } : any) => {
  const store = useCart();
  const toCheckOut = () => {
    onClose();
    Inertia.get('/checkout');
  }
  return (
    <div className='header'>
      <small className='font-poppins'>
        Keranjang {store.len ? `(${store.len})` : ""}
      </small>
      <Button variant='contained' size='small' onClick={toCheckOut} sx={{textTransform: "none", borderRadius: 0}}>
        Checkout
      </Button>
    </div>
  )
})

const Item = observer(({ store }: {store: CartItemType})=>{
  return (
    <div className='item'>
      <img src={store.image} alt=""/>
      <div className="info">
        <p className='font-poppins name'>
          {store.name}
        </p>
        <div className="flex font-poppins">
          <p>
            Rp {formatMoney(store.price)}
          </p>
          <small>
            x {store.amount}
          </small>
        </div>
      </div>
    </div>
  )
})

const Content = observer(()=>{
  const store = useCart();
  return (
    <div>
      {
        store.items.map(item=>(
          <Item store={item} key={item.id}/>
        ))
      }
    </div>
  )
})

export const CartMenu = observer( ({target, handleClose}: Props) => {
  const open = Boolean(target)
  const store = useCart();
  return (
      <Popper sx={{
        zIndex:12000
      }} open={open} transition placement='bottom-start' anchorEl={target}>
        {
          ({TransitionProps})=>(
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: 'right top',
              }}
            >
              <Paper sx={sx} style={{display : open ? 'block' : "none"}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <div>
                    {
                      ! store.len ?
                        <p className='font-poppins center'>
                          Anda belum menambahkan produk
                        </p> : (
                          <>
                            <Header onClose={handleClose}/>
                            <Divider className='divider'/>
                            <Content/>
                          </>
                        )
                    }
                  </div>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )
        }
      </Popper>
  );
});
const sx = {
  minWidth:300, p: 2,borderRadius:0,
  "& .header":{
    display: 'flex',
    justifyContent:"space-between",
    alignItems: 'center',
  },
  "& .divider":{
    my:1
  },
  "& .item":{
    display: 'flex',
    mb: 1,
    "& .info":{
      flex:1,
      px: 1,
      "& .flex":{
        display: 'flex',
        justifyContent: "space-between"
      },
      '& .name':{
        fontSize: '0.8rem',
        fontWeight:"bolder"
      },
    },
    "& img":{
      height: 50,
      width: 50
    }
  }
}
