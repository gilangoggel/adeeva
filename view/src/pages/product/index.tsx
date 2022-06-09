import {ProductList} from '@components/product-list'
import {Container, Divider, Tabs, Tab} from "@mui/material";
import {View} from './view'
import {ProductUtilsProvider} from '../../provider/product-utils-provider'
import {useState} from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { PageProps as Props, PageContext, useProvider } from './product-page-context'
import { Comment } from './comment'

const WrapAnimation = ({children}: any) => {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{
        opacity:{
          duration: 1
        }
      }}
    >
      {children}
    </motion.div>
  )
}


export const Product = (props: Props) => {
  const [tab, setTab] = useState<'recomendation' | 'comment'>('recomendation')
  const { product, recomendations } = props;
  const ctx = useProvider();
  return (
    <PageContext.Provider value={ctx}>
      <Container>
        <ProductUtilsProvider {...product} >
          <View/>
        </ProductUtilsProvider>
        <Divider sx={{mb: 2}}/>
        <Tabs value={tab} onChange={(e: any, v)=>setTab(v)}>
          <Tab value='recomendation' label={
            <span className='font-raleway' style={{textTransform:"none"}}>
            Rekomendasi produk
          </span>
          }/>
          <Tab value='comment' label={
            <span className='font-raleway' style={{textTransform:"none"}}>
            Komentar
          </span>
          }/>
        </Tabs>
        <AnimatePresence exitBeforeEnter>
          <WrapAnimation key={tab}>
            {
              tab === "recomendation" ?
                <ProductList products={recomendations}/> :
                <ProductUtilsProvider {...product} >
                  <Comment/>
                </ProductUtilsProvider>
            }
          </WrapAnimation>
        </AnimatePresence>
      </Container>
    </PageContext.Provider>
  );
};
