import * as React from 'react';
import {observer} from "mobx-react";
import {TableFooter, TableRow, TableCell, Button} from "@mui/material";
import {useResellerAddProduct} from "@stores/add-product-store";
import {formatMoney} from "@utils/format-money";
import {AddShoppingCart} from "@mui/icons-material";
import {useFormUtilProvider} from "@hooks/use-form-utils";
import { FormData } from './types'



export const CartInfo = observer( () => {
  const store = useResellerAddProduct();
  const {setData, loading, onSubmit : submit}  = useFormUtilProvider<FormData>();

  const onSubmit = (e: any) => {
    const inputdata = store.toArray.map(item=>({
      id: item.id,
      amount: item.amount,
      pax: item.product.pax,
      subTotal: item.subTotal
    }));
    setData('products', inputdata)
    submit(window.location.pathname.replace("/add", '/order'))(e)
  }

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={4} align='right'>
          Kuantitas produk
        </TableCell>
        <TableCell colSpan={2} align='right'>
          {store.quantity} pcs
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} align='right'>
          Total pembayaran
        </TableCell>
        <TableCell colSpan={2} align='right'>
          Rp {formatMoney(store.total)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' colSpan={6}>
          <>
            <Button
              onClick={onSubmit}
              disabled={store.isEmpty || loading}
              startIcon={
                <AddShoppingCart/>
              }
              sx={{
                borderRadius:2,
                textTransform:"none"
              }}
              color='primary' variant='contained'>
              Pesan produk
            </Button>
          </>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
});
