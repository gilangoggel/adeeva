import { ShoppingCart } from '@mui/icons-material'
import {observer} from "mobx-react";
import {useResellerAddProduct} from "@stores/add-product-store";
import { CartItem } from './cart-item'
import {Table, TableContainer, TableRow,TableCell, TableHead,TableBody, Typography, Paper} from "@mui/material";
import { CartInfo as Footer } from './cart-info'

export const CartList = observer( () => {

  const store  = useResellerAddProduct();

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='font-poppins'>
                Produk
              </TableCell>
              <TableCell className='font-poppins'>
                Jumlah
              </TableCell>
              <TableCell className='font-poppins'>
                Kuantitas produk
              </TableCell>
              <TableCell align='right' className='font-poppins'>
                Harga
              </TableCell>
              <TableCell colSpan={2} className='font-poppins'>
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              store.isEmpty ?
                <TableRow>
                  <TableCell sx={{borderBottom:'none'}} colSpan={6}>
                    <div style={{textAlign:'center'}}>
                      <ShoppingCart sx={{fontSize:"5rem", color:'primary.main'}}/>
                      <Typography color='primary'>
                        Silahkan tambahkan produk
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow> : null
            }
            {
              store.toArray.map(item=>(
                <CartItem store={item} key={item.id}/>
              ))
            }
          </TableBody>
          <Footer/>
        </Table>
      </TableContainer>
    </Paper>
  );
});
