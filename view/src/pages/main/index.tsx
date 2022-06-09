import {observer} from "mobx-react";
import {useAuthListener} from "@hooks/auth-hooks";
import {wrapLayoutComponent} from "@utils/wrap-layout-component";
import { HighlightProducts } from '@components/home/highlight-product'
import { PublicContext, publicPageStore } from '@stores/public-page-store'
import {usePage} from "@inertiajs/inertia-react";
import {useEffect, useMemo} from "react";
import { FeatureBar } from './feature-bar'
import { Recomendations } from './recomendations'
import { Container } from "@mui/material"
import {useCheckAuth} from "@root/provider/check-auth-provider";

const Home = observer( ({highlight = true}) => {
  useAuthListener();
  const { mode } = usePage().props

  const checkAuth = useCheckAuth();

  useEffect(()=>{
    checkAuth();
  },[])

  const publicStore = useMemo(()=>{
    return publicPageStore.create({
      mode: "list"
    })
  }, [])

  useEffect(()=>{
    publicStore.updateMode(mode as any)
  }, [mode])
  return (
    <PublicContext.Provider value={publicStore}>
      {
        publicStore.mode === "list" ?
          <>
            <HighlightProducts/>
            <FeatureBar/>
          </>
          : null
      }
      <Container sx={{my:10, textAlign:'center'}}>
        <h1>Deskripsi adeva</h1>
      </Container>
      <Recomendations/>
    </PublicContext.Provider>
  );
})
export const Main = wrapLayoutComponent(Home);
