import { Layout } from './layout'
import { useLoadContent } from './use-load-content'
import { load } from '@stores/user/transaction-history'
import {useEffect} from "react";
import {observer} from "mobx-react";
import {useToggle} from "@hooks/use-toggle";
import { usePage } from '@inertiajs/inertia-react'
import { motion, AnimatePresence } from 'framer-motion'

const animation = {
  initial : {opacity: 0, y: '-100%'},
  animate : {opacity: 1, y: 0},
  exit : {opacity: 0, y: "100%"},
  transition:{
    y:{
      // type: "tween",
      delay: 0.2
    },
    opacity:{
      delay: 0.2
    }
  }
}

export const Account = observer( () => {
  const Content = useLoadContent();
  const [ loading, toggle ] = useToggle(true)
  useEffect(()=>{
    load().then(toggle)
  }, [])
  const { url } = usePage();

  return (
    <Layout>
      {
        ! loading ?
          <AnimatePresence exitBeforeEnter>
            <motion.div {...animation} key={url}>
              <Content/>
            </motion.div>
          </AnimatePresence>
          : null
      }
    </Layout>
  );
});
