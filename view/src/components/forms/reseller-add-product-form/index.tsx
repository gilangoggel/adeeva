import {useEffect} from 'react';
import { FormLayout } from '../form-layout'
import {useFormUtils} from "@hooks/use-form-utils";
import { ProductField } from './product-field'
import { FormData } from './types'
import { CartList } from './cart-list'
import {addProductStore, Context} from '@stores/add-product-store'
import {useMemo} from "react";
import {Box} from "@mui/material";
import {useQueryParams} from "@hooks/use-query-params";
import {usePage} from "@inertiajs/inertia-react";

const backuri = '/reseller/product'
const ProductSelector = () => {
  return (
    <Box sx={{py:1}}>
      <ProductField/>
    </Box>
  )
}

export const ResellerAddProductForm = () => {
  const context = useFormUtils<FormData>({
    products: []
  }, {});
  const params = useQueryParams();
  const {products}  = usePage().props;
  const store = useMemo(()=>{
    return addProductStore.create({
      items: {
      }
    })
  }, [])

  useEffect(()=>{
    const product = params.product;
    if (product){
      const item = (products as any[]).find(item=>item.id == product)
      store.add(item)
    }
  }, [])

  return (
    <Context.Provider value={store}>
      <FormLayout
        title='Tambah produk anda'
        backuri={backuri}
        backTooltip='Kembali ke data product'
        context={context as any}
        resolveUrl={()=>window.location.pathname}
      >
        <ProductSelector/>
        <CartList />
      </FormLayout>
    </Context.Provider>
  );
};
