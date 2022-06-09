import {Box, Grid, useMediaQuery, useTheme, Divider, IconButton} from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { useHighlightProductProvider, useHighlight, Context  } from './provider'
import { ImageContainer } from './image-container'
import {observer} from "mobx-react";
import {layoutStore} from "@components/layout/common/store";
import {useIsSm} from "@hooks/use-is-sm";
import { AnimatePresence } from 'framer-motion'
import { FiberManualRecord } from '@mui/icons-material'
import {useMemo} from "react";
import {HeaderSpacer} from "@components/header-spacer";

const sx = {
  "& > .dot-container":{
    display: 'flex',
    justifyContent: "center",
    "& svg":{
      mx: 1,
      color: '#ececec',
      transition : 'all ease-in-out 1s',
      "&[data-selected='true']":{
        color: '#d2d2d2',
      }
    },
    mb: [3,0]
  },
  "& > .title-container":{
    py:2,
  }
}

const Header = () => {
  const {control: [active, len]}  = useHighlight();
  const items = useMemo(()=>{
    return Array.from({length: len}).map((_, index)=>index)
  }, [len])
  return (
    <Box sx={sx as any}>
      <div className="title-container">
        <HeaderSpacer>
          Rekomendasi produk
        </HeaderSpacer>
      </div>
      <div className="dot-container">
        {
          items.map(item=>(
            <FiberManualRecord key={item} data-selected={item === active}/>
          ))
        }
      </div>
    </Box>
  )
}

const controlSx = {
  position : "absolute",
  left: 0,
  top: "50%",
  "& > div":{
    display: 'flex',
    justifyContent :"space-between",
    px: 3,
  },
  transform: "translateY(-50%)" ,
  width: '100%',
  zIndex: 1,
  "& button":{
    bgcolor:'#d6d6d6',
    "&:focus":{
      bgcolor:'#b7b7b7',
    }
  }
} as any

const Control = () => {
  const isSm = useIsSm()
  const { paginate } = useHighlight();
  const next = () => paginate(1);
  const prev = () => paginate(-1);
  return (
    <Box sx={controlSx}>
      <div>
        <IconButton onClick={prev} size={isSm ? 'small' : "large"}>
          <ArrowBack/>
        </IconButton>
        <IconButton onClick={next} size={isSm ? 'small' : "large"}>
          <ArrowForward/>
        </IconButton>
      </div>
    </Box>
  )
}

export const HighlightProducts = observer( () => {
  const ctx  = useHighlightProductProvider();
  const { product, products } = ctx;
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  if (! product){
    return <></>
  }
  return (
    <Context.Provider value={ctx}>
      <Box sx={{mt: 0, px:0, position: "relative"}} style={{paddingTop: layoutStore.appbarHeight / 2}}>
        <Header/>
        <Control/>
        <Grid container sx={{position: "relative", overflowX:"hidden"}}>
          <AnimatePresence exitBeforeEnter>
            {
              products.map((item, index)=>(
                <ImageContainer left={index === 0} {...item as any} key={item.id} />
              ))
            }
          </AnimatePresence>
        </Grid>
      </Box>
    </Context.Provider>
  );
});
