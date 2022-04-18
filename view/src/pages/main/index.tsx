import {observer} from "mobx-react";
import {useGlobalStore} from "@root/provider/globar-store-provider";
import { Inertia } from '@inertiajs/inertia'
import {useAuthListener} from "@hooks/auth-hooks";
import {wrapLayoutComponent} from "@utils/wrap-layout-component";
import { HighlightProducts } from '@components/home/highlight-product'
import { ProductList } from '@components/home/product-list'
import { PublicContext, publicPageStore } from '@stores/public-page-store'
import {usePage} from "@inertiajs/inertia-react";
import {useEffect, useMemo} from "react";
import { AnimatePresence, motion } from 'framer-motion'

const toLogin = () => {
  Inertia.get('/sign-in');
}
const logout = () => {
  Inertia.post('/logout', {}, {});
}

const Home = observer( ({highlight = true}) => {
  const store  = useGlobalStore();
  useAuthListener();
  const {user} = store;
  const { mode } = usePage().props

  const publicStore = useMemo(()=>{
    return publicPageStore.create({
      mode: "list"
    })
  }, [])

  useEffect(()=>{
    publicStore.updateMode(mode as any)
  }, [mode])
  console.log(mode)
  return (
    <PublicContext.Provider value={publicStore}>
      {
        publicStore.mode === "list" ?
          <HighlightProducts/> : null
      }
      <ProductList/>
    </PublicContext.Provider>
  );
})
export const Main = wrapLayoutComponent(Home);
