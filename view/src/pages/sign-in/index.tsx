import {wrapLayoutComponent} from "@utils/wrap-layout-component";
import {Box} from '@mui/material'
import { motion } from 'framer-motion'
import { FormContainer } from './form-container'
import {observer} from "mobx-react";
import {layoutStore} from "@components/layout/common/store";
import {useIsSm} from "@hooks/use-is-sm";

const sx = {
  display: 'flex',
  flexDirection:['column','row'],
  "& .img-container":{
    width: ["100%","50%"],
    // bgcolor:"primary.main",
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    textAlign: 'center',
  },
  "& img":{
    width: '50%',
    height: "50%"
  },
  "& h1":{
    color:'secondary.main',
    textAlign:'center',
    mt: 3,
    fontWeight:"bolder",
    fontSize:["1.5rem","3rem"]
  },
  "& .form-container":{
    width: ['100%',"50%"],
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    "& > div":{
      width: "50%",
      bgcolor:"white",
      p: 10,
      borderRadius:5,
      boxShadow:10
      // flex: 1,
    }
  }
}
const transition = {
  x:{
    type: "tween",
    duration: 1,
  },
  opacity: {
    duration : 1
  }
}

const imgProps = {
  initial: {
    x: "-100%",
    opacity:0
  },
  animate:{
    x: 0,
    opacity:1
  },
  transition
}
const formAnimation = {
  initial: {
    opacity: 0
  },
  animate:{
    opacity: 1,
    transition:{
      delay: 1
    }
  },
  transition
}

const Page = observer( () => {
  const isSm = useIsSm();
  const height = isSm ? 'fit-content' : layoutStore.get100Vh()
  return (
    <Box sx={sx as any}>
      <motion.div {...imgProps} key='c' style={{height}} className="img-container">
        <div>
          <img src="/assets/login.svg" alt=""/>
          <h1 className='font-poppins'>
            Selamat datang
          </h1>
        </div>
      </motion.div>
      <motion.div {...formAnimation} className="form-container">
        <div>
          <FormContainer/>
        </div>
      </motion.div>
    </Box>
  );
})
export const SignIn = wrapLayoutComponent(Page)
