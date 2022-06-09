import * as React from 'react';
import {Box, Grid} from "@mui/material";
import {observer} from "mobx-react";
import {useCheckoutPage} from "@stores/checkout";
import {useCallback} from "react";

type Props = {
  items : (string| Option)[]
  description: string
  title: string
}

const sx = {
  '&[data-selected="true"]':{
    "& > div":{
      bgcolor:'#f4f4f4'
    }
  },
  ':hover:not([data-selected="true"])':{
    "& > div":{
      bgcolor:'#f4f4f4'
    }
  },
  minHeight: 100,
  bgcolor:'white',
  cursor: "pointer",
  textAlign: 'center',
  "& img":{
    width: 72,
    height: 72
  },
  "& p":{
    my:1,
    textTransform:"uppercase",
    fontSize:"0.8rem"
  },
  "& > div":{
    p: 1,
    border: "solid 1px",
    transition : "all ease-in-out .5s",
    borderRadius: 0.5,
    borderColor: '#eeeeee'
  },
  mb: 1
}

type Option = {
  label : string
  value: string
}

const parseOption = (name: string | Option) => {
  if (typeof name === "string"){
    return {
      value: name,
      label: name
    }
  }
  return name
}

const BankOption = observer( ({option : name}: {option: string| Option}) => {
  const store = useCheckoutPage();
  const { value, label } = parseOption(name);
  const onClick = useCallback(()=>{
    store.updatePayment(value);
  }, [])
  return (
    <Grid item sm={4} xs={6} sx={sx} onClick={onClick} data-selected={value === store.selectedPayment}>
      <div>
        <img src={`/assets/bank-image/${value}.png`} alt=""/>
        <p className='font-poppins'>
          {label}
        </p>
      </div>
    </Grid>
  )
})

export const OptionContainer = ({title, description, items}: Props) => {
  return (
    <>
      <Box sx={{
        "& > p":{
          fontSize:"0.8rem"
        },
        mb:3
      }}>
        <h3 className='font-raleway'>
          {title}
        </h3>
        <p className='font-poppins'>
          {description}
        </p>
        <Grid container sx={{mt: 1}} spacing={1}>
          {
            items.map(item=>{
              return (
                <BankOption option={item} key={typeof item === "string" ? item : item.value}/>
              )
            })
          }
        </Grid>
      </Box>
    </>
  );
};
