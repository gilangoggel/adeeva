import {ProductList} from '@components/product-list'
import {Container, Divider} from "@mui/material";
import {View} from './view'
import {ProductUtilsProvider} from '../../provider/product-utils-provider'

type Props = {
  recomendations: IProduct[],
  product: IProduct
}


export const Product = ({product, recomendations}: Props) => {

  return (
    <Container>
      <ProductUtilsProvider {...product} >
        <View/>
      </ProductUtilsProvider>
      <h2 className='font-poppins' style={{fontWeight:"lighter"}}>
        Rekomendasi produk
      </h2>
      <Divider sx={{mb: 2}}/>
      <ProductList products={recomendations}/>
    </Container>
  );
};
