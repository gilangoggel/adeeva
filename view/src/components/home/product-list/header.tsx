import * as React from 'react';
import {Paper ,Box, Divider, TextField, InputAdornment} from "@mui/material";
import {useForm, usePage} from "@inertiajs/inertia-react";
import {Search} from "@mui/icons-material";
import { motion } from 'framer-motion'
import {observer} from "mobx-react";
import {usePublicStore} from "@stores/public-page-store";
import {useEffect} from "react";


const categoryMap: Record<string, any> = {
  cosmetic : "Produk kecantikan",
  fnb: "Makanan & Snack",
  clotes:"Pakaian"
}

const PaginatorInfo = ({meta : {total}}: any) => {
  return (
    <>
      {total} produk
    </>
  )
}

const SearchForm = () => {
  const {data, setData, get} = useForm({
    query: "",
  })
  const { category } = usePage().props;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const url = category ? `/category/${category}` : '/search';
    get(url, {
      preserveState:false
    })
  }
  useEffect(()=>{
    if (category){
      setData('query', '')
    }
  },[category])

  const onChange= (e: any) => {
    setData('query', e.target.value ?? undefined);
  }
  return (
    <Paper component='form' onSubmit={handleSubmit} sx={{p:1, borderRadius: 3, minWidth:"30vw"}}>
      <TextField
        fullWidth
        onChange={onChange}
        value={data.query}
        placeholder='Pencarian'
        InputProps={{
          disableUnderline:true,
          startAdornment: (
            <InputAdornment position='start'>
              <Search/>
            </InputAdornment>
          )
        }}
        variant='standard'
      />
      <button style={{display:"none"}} type='submit'/>
    </Paper>
  )
}

export const Header = observer( () => {
  const { category, paginator } = usePage().props as any;
  const store = usePublicStore();
  return (
    <Box sx={sx}>
      <Box sx={{mb: 2, textAlign:'center'}} className='font-poppins'>
        <h1>
          {categoryMap[category] ? categoryMap[category] : paginator !== undefined ? (
            <PaginatorInfo {...paginator}/>
          ) : "Rekomendasi produk"}
        </h1>
        <Divider className='divider'/>
        <motion.div>
          <SearchForm/>
        </motion.div>
      </Box>
    </Box>
  );
});
const sx = {
  display: "flex",
  justifyContent :"center",
  minHeight: "30vh",
  alignItems:"center",
  position: 'relative',
  bgcolor:"primary.dark",
  backgroundSize:"cover",
  backgroundPosition:"center",
  backgroundImage: "url('/assets/wave.png')",
  "& h1":{
    fontWeight:"bolder",
    fontSize: "2rem",
    my:1,
    color:"white"
  },
  "& .divider":{
    bgcolor:"white",
    borderRadius : '3px',
    height: 3,
    mb: 2
  }
}
