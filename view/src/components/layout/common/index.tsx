import {Box, ThemeProvider} from "@mui/material";
import { Header } from './header'
import { appTheme } from './theme'
import {Component, createRef, RefObject} from 'react'
import { layoutStore } from './store'
import {observer} from "mobx-react";
import { CartContext, userCartStore, applyStoreSnapshoot } from '@stores/cart-store'

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
            <div >
              <Header ref={this.headerRef}/>
            </div>
            <div style={{paddingTop: layoutStore.appbarHeight}}>
              {this.props.children}
            </div>
          </Box>
        </CartContext.Provider>
      </ThemeProvider>
    );
  }
})
