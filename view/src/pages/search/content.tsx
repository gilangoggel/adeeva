import * as React from 'react';
import { ProductList } from '@components/product-list'
import { usePaginator } from '@stores/paginator'
import {observer} from "mobx-react";
import {usePage} from "@inertiajs/inertia-react";
import {Box, Pagination, Stack} from "@mui/material";
import { useQuery } from './query-provider'
import {useEffect} from "react";

const PaginationInfo = observer( () => {
  const store = usePaginator();
  const total = Math.ceil(
    store.meta.total / store.meta.per_page
  )
  const [ , { paginate }] = useQuery();
  const handleChange = (e: any, v: any) =>{
    paginate(v);
  }
  return (
    <Stack sx={{mb: 5}} justifyContent='center' direction='row'>
      <Pagination onChange={handleChange} page={store.meta.current_page} count={ total }/>
    </Stack>
  )
})

export const Content = ( () => {
  const { paginator: {data} } = usePage().props as any;
  useEffect(()=>{
    const el = document.getElementById('main-wrapper');
    if (el){
      el.scrollTo({
        behavior: "smooth", top: 0
      })
    }
  })
  return (
    <Box sx={{px: 3,}}>
      <ProductList products={data}/>
      <PaginationInfo/>
    </Box>
  );
});
