import * as React from 'react';
import {Grid} from "@mui/material";
import {ProductUtilsProvider} from "@root/provider/product-utils-provider";
import {CardItem} from "./card-item";


type Props = {
  products: IProduct[]
}


export const ProductList = ({products} : Props) => {
  return (
    <Grid container spacing={5} sx={{mb: 10}}>
      {
        products.map(item=>(
          <ProductUtilsProvider key={item.id} {...item} >
            <CardItem  />
          </ProductUtilsProvider>
        ))
      }
    </Grid>
  );
};
