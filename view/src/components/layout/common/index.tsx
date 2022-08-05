import {Box, ThemeProvider, Container} from "@mui/material";
import { appTheme } from './theme'
import {Component, createRef, RefObject} from 'react'
import { layoutStore } from './store'
import {observer} from "mobx-react";
import { CartContext, userCartStore, applyStoreSnapshoot } from '@stores/cart-store'
import { Header } from '../shared/header'
import { Footer } from './footer'

const headerSx = {
  position: "fixed",
  top: 0,
  width: "100vw",
  py:1,
  left:0,
  // background :"white",
  zIndex:(t: any)=>t.zIndex.appBar+1,
  "& > .container":{
    boxShadow:2,
    bgcolor:'rgba(255,255,255,0.56)',
    borderRadius: 10,
  },
}

export const Common = observer( class Common extends Component<any, any>{

  headerRef : RefObject<HTMLDivElement>

  constructor(props : any) {
    super(props);
    this.headerRef = createRef();
  }

  setHeight = () => {
    const header = this.headerRef.current;
    if (header){
      layoutStore.setHeight(header.getBoundingClientRect().height);
    }
  }

  componentDidMount() {
    this.setHeight();
    window.addEventListener('resize', this.setHeight)
    applyStoreSnapshoot();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight)
  }

  render() {
    return (
      <ThemeProvider theme={appTheme}>
        <CartContext.Provider value={userCartStore}>
          <Box sx={{bgcolor:'white', minHeight: "100vh", overflowX:"hidden"}}>
            <Box sx={headerSx} id='main-header' ref={this.headerRef}>
              <Container className='container' sx={{px: [0, null]}}>
                <Header/>
              </Container>
            </Box>
            <Box sx={{ bgcolor:"secondary.main"}}>
              <Box
                sx={{
                  zIndex: t=>t.zIndex.appBar,
                  bgcolor:'white',
                  position: "absolute",
                  top: 0,
                  left:0,
                  width:"100vw",
                  height:`${layoutStore.appbarHeight}px`
                }}
              />
              <Box sx={{
                paddingTop: `${layoutStore.appbarHeight}px`,
                boxShadow:10,
                borderBottomRightRadius:50,
                borderBottomLeftRadius:50,
                bgcolor:'white',
                mb:5,
                pb:5
              }}>
                {this.props.children}
              </Box>
              <Footer/>
            </Box>
          </Box>
        </CartContext.Provider>
      </ThemeProvider>
    );
  }
})
