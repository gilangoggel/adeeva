import * as React from 'react';
import {useMemo} from 'react';
import {Box, Container} from "@mui/material";
import {Header} from './header'
import {usePage} from "@inertiajs/inertia-react";
import {ProductList as List} from '../../product-list'

type Paginate = {
  data: IProduct[]
}

type P = {
  products : IProduct[]
  mode: string
  paginator: Paginate
}

const sx = {
  "& > .wave-container":{
    height: "30vh",
    position: "relative",
  }
}

export const ProductList = () => {
  const { products, mode, paginator } = usePage().props as unknown as P
  const items = useMemo( () => {
    if (mode === "paginate" && paginator){
      return paginator.data;
    }
    return products;
  }, [mode, paginator])
  return (
    <Box sx={{mt: 2, minHeight: "100vh"}}>
      <Header/>
      <Box sx={sx}>
        <Container sx={{pt: 4, pb: 10}}>
          <List products={items} />
        </Container>
      </Box>
    </Box>
  );
};
