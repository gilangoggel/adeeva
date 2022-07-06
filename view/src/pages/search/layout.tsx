import * as React from 'react';
import {ComponentType, createRef, RefObject, useCallback, useContext} from "react";
import { Grid, Box, Button, Divider, Drawer } from '@mui/material'
import { FilterAlt as Filter } from '@mui/icons-material'
import { layoutStore  } from '@components/layout/common/store'
import {observer} from "mobx-react";
import { LayoutContext as Context, ILayout } from './store'

type State = {
  headerHeight: number
  openMobileFilter: boolean;
}
type Props = {
  isSm : boolean
  sidebarContent: ComponentType<any>
  headerContent: ComponentType<any>
  info: ComponentType<any>
  orderField: ComponentType<any>
}

export function useAfterSubmit(){
  const ctx = useContext(Context) as ILayout;
  return useCallback(ctx.toggler, [])
}

class Node extends React.Component<Props, State> {
  headerRef : RefObject<HTMLDivElement>

  constructor(props : any) {
    super(props);
    this.state = {
      headerHeight: 0,
      openMobileFilter: false
    }
    this.headerRef = createRef()
  }

  getContentHeight = () => {
    return layoutStore.get100Vh() - (this.state.headerHeight );
  }

  setHeaderHeight = () => {
    const div = this.headerRef.current;
    if (div){
      this.setState({
        headerHeight: div.getBoundingClientRect().height
      })
    }
  }
  componentDidMount() {
    this.setHeaderHeight();
    window.addEventListener('resize', this.setHeaderHeight)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeaderHeight)
  }

  get mainHeaderHeight(){
    const el = document.getElementById('main-header');
    if (el) return el.getBoundingClientRect().height;
    return 0
  }

  renderHeader = () => {
    const { isSm ,headerContent : Header , sidebarContent : Sidebar } = this.props
    return (
      <Box
        sx={{
          zIndex: t=>t.zIndex.appBar+ 10000
        }}
        ref={this.headerRef}>
        <Header/>
        {isSm ? <Sidebar/> : null}
      </Box>
    )
  }

  toggleMobile = () => {
    this.setState({
      openMobileFilter: ! this.state.openMobileFilter
    })
  }

  renderMobile = () => {
    const { sidebarContent : Sidebar, headerContent: Header, info: Info , orderField : OrderField , children } = this.props
    return (
      <Box sx={mobileSx} className='overlay-scrollbar reverse' style={{
        height: layoutStore.get100Vh(),
      }}>
        <div className="header-container">
          <Box sx={{px:1}}>
            <Info/>
          </Box>
          <Button
            startIcon={
              <Filter/>
            }
            size='small' variant='contained' onClick={this.toggleMobile}>
            Filter
          </Button>
          <Drawer PaperProps={{
            sx:{
              width: '100vw'
            }
          }} open={this.state.openMobileFilter}>
            <Button onClick={this.toggleMobile} sx={{mb: 2}}>
              Tutup
            </Button>
            <Box sx={{px: 1}}>
              <OrderField/>
            </Box>
            <Header/>
            <Sidebar/>
          </Drawer>
        </div>
        {
          children
        }
      </Box>
    )
  }

  renderDesktop = () => {
    const { sidebarContent : Sidebar, info : Info } = this.props;

    return (
      <Box sx={desktopSx} style={{
        marginTop: this.mainHeaderHeight,
        height: `calc(100vh - ${this.mainHeaderHeight}px)`,
      }}>
        {this.renderHeader()}
        <Grid container>
          <Grid className='sidebar' item md={3} lg={2}>
            <div className="wrapper">
              <Sidebar/>
            </div>
          </Grid>
          <Grid item md={9} lg={10} className='content'>
            <div id='main-wrapper' className='wrapper overlay-scrollbar reverse' style={{height: this.getContentHeight()}}>
              <Info/>
              {this.props.children}
            </div>
          </Grid>
        </Grid>
      </Box>
    )
  }

  getContext=  () : ILayout => ({
    toggler: this.toggleMobile
  })

  render() {
    const { isSm } = this.props
    return (
      <Context.Provider value={this.getContext()}>
        <>
          {isSm ? this.renderMobile() : this.renderDesktop()}
        </>
      </Context.Provider>
    );
  };
};

export const Layout = observer(Node);
const desktopSx = {
  position: "absolute",
  top: 0,
  left:0,
  width: "100%",
  overflow:"hidden",
  '& .sidebar':{
    "& .wrapper":{
      px: 1,
    }
  },
  "& .content":{
    "& > .wrapper":{
      position: 'relative'
    }
  }
}

const mobileSx = {
  position: 'relative',
  '& .header-container':{
    zIndex: (t: any)=>t.zIndex.appBar+ 1,
    position: "sticky",
    bgcolor:'white',
    top: 0,
    left:0,
    "& > button":{
      m: 1,
      mx: 2,
    },
  }
}
