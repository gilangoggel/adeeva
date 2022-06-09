import { Typography, Divider } from '@mui/material'
import {usePage} from "@inertiajs/inertia-react";
import {useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import { motion, AnimatePresence } from 'framer-motion'

const map = {
  "pending-payment": "Menunggu pembayaran",
  "transaction" : "Transaksi",
  "profile" : "Profil",
  contact: "Kontak",
  credential: "Email & password",
  retur: "Pengembalian barang"
}

function useResolveTitle() : string{
  const { tab } = usePage().props.query as Record<string, any>
  return map[tab as keyof typeof map] ?? "";
}

const animation = {
  transition:{
    x:{
      type:'tween',
      duration: 0.5
    }
  },
  initial:{
    x: "100%",
    opacity: 0
  },
  animate:{
    x: 0,
    opacity: 1,
  },
  exit:{
    x: '100%',
    opacity: 0,
  }
}
export const Header = () => {
  const page = usePage();
  const title = useResolveTitle();
  const { tab } = usePage().props.query as Record<string, any>
  useEffect(()=>{
    if (! tab){
      Inertia.get("/account?tab=profile")
    }
  }, [tab])

  return (
    <div style={{overflowX:"hidden"}}>
      <AnimatePresence exitBeforeEnter>
        <Typography
          {...animation}
          color='secondary'
          key={title}
          fontWeight='bold'
          variant='h3'
          className='font-poppins'
          component={motion.div}
        >
          {title}
        </Typography>
      </AnimatePresence>
      <Divider sx={{mt:1}}/>
    </div>
  );
};
