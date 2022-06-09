import {ITransaction} from "@models/transaction-extended";
import {observer} from "mobx-react";
import { Details } from './details'
import { ReturForm } from './retur-form'
import { DialogContext } from './context'
import {useToggle} from "@hooks/use-toggle";
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  store: ITransaction
}

const animation = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 1
  }
}
const Container = ({detailMode}: any) => {
  return (
    <motion.div {...animation}>
      {detailMode ?
        <Details/> : <ReturForm/>
      }
    </motion.div>
  )
}

export const Switcher = observer( ({store}: Props) => {
  const [detailMode, toggle] = useToggle(true)
  return (
    <DialogContext.Provider value={[store, toggle]}>
      <AnimatePresence exitBeforeEnter>
        <Container detailMode={detailMode} key={detailMode ? 'detail' : 'form'}/>
      </AnimatePresence>
    </DialogContext.Provider>
  );
});
