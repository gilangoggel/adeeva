import {Box, ThemeProvider, Container} from "@mui/material";
import { appTheme } from './theme'
import {Component, createRef, RefObject} from 'react'
import { layoutStore } from './store'
import {observer} from "mobx-react";
import { CartContext, userCartStore, applyStoreSnapshoot } from '@stores/cart-store'
import { Header } from '../shared/header'

const headerSx = {
  position: "sticky", top: 0, left:0, background :"white",zIndex:100*100,
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
          <Box sx={{bgcolor:'white', minHeight: "100vh"}}>
            <Box sx={headerSx} id='main-header' ref={this.headerRef}>
              <Container sx={{px: [0, null]}}>
                <Header/>
              </Container>
            </Box>
            <div style={{paddingTop: layoutStore.appbarHeight}}>
              {this.props.children}
            </div>
          </Box>
        </CartContext.Provider>
      </ThemeProvider>
    );
  }
})
