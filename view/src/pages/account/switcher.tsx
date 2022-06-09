import { useAccount } from './hoc'
import { AnimatePresence, motion } from 'framer-motion'
import {Box} from "@mui/material";
import { Profile } from './profile'
import { PurchaseHistory } from './purchase-history'
import { Settings } from './settings'
import {ComponentType, useMemo} from "react";


const map: Record<string, ComponentType<any>> = {
  account: Profile,
  'purchase-history': PurchaseHistory,
  setting:Settings
}

const variant = {
  initial: {
    opacity: 0
  },
  animate:{
    opacity: 1
  },
  exit:{
    opacity: 0
  }
}

const sx = {
  bgcolor:'white',
  minHeight: "50vh",
  p:2,
  mb: 10,
}

export const Switcher = () => {

  const [ {tab} ] = useAccount();
  const Component = useMemo(()=>{
    return map[tab];
  }, [tab]) ;

  return (
    <AnimatePresence exitBeforeEnter>
      <Box sx={sx} initial='initial' animate='animate' exit='exit' component={motion.div} variants={variant} transition={{}} key={tab}>
        <Component/>
      </Box>
    </AnimatePresence>
  );
};
