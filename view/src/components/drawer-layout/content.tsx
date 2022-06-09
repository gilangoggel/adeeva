import {AnimatePresence, motion} from "framer-motion";
import {Fragment} from "react";
import { useCurrentComponent, useDrawerProps } from './context'

const animation = {
  initial: {
    opacity:0
  },
  animate:{
    opacity: 1
  },
  exit:{
    opacity:0
  }
}

const Wrapper = ({children}: any) => {
  return (
    <motion.div {...animation}>
      {children}
    </motion.div>
  )
}
export const Content = () => {
  const {render, componentProps}  = useDrawerProps();
  const content = useCurrentComponent();
  if (! content) return <Fragment/>
  const {component : Component, key}  = content;
  return (
    <AnimatePresence exitBeforeEnter>
      <Wrapper key={key}>
        {
          ! render ?
            <Fragment/> :
            <Component {...componentProps}  />
        }
      </Wrapper>
    </AnimatePresence>
  );
};
