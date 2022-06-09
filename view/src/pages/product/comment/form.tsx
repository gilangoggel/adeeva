import {useRatingForm, FormContext} from "@hooks/use-rating-form";
import {Button, Rating, TextField, Box} from "@mui/material";
import {useEffect, useState} from "react";
import { useProductPage  } from '../product-page-context'


const labelmap = [
  'Sangat buruk', 'Buruk', 'Biasa', 'Lumayan','Bagus', 'Sangat bagus'
];



export const Form = () => {

  const context = useRatingForm();

  const [ response, {
    register : inputProps,
    input: inputs
  }, {loading, reset, onSubmit} ] = context;

  const [current, setCurrent] = useState<number>( 3 )
  const [, pushComment ] = useProductPage();

  useEffect(()=>{
    if (response){
      console.log(response);
      pushComment(response)
      reset()
    }
  }, [response])

  const ratingLabel = labelmap[current ? current : parseInt(inputs.rating as any)] ?? 'Lumayan'

  return (
    <div className='font-raleway'>
      <p>
        Berikan rating pada produk kami
      </p>
      <Box sx={{display: 'flex', alignItems:'center',justifyContent:'space-between', mt: 2}}>
        <Rating
          size='large'
          onChangeActive={(e, v)=> setCurrent(v)}
          {...inputProps('rating') as any}
        />
        <small>
          {ratingLabel}
        </small>
      </Box>
      <form onSubmit={onSubmit}>
        <TextField
          {...inputProps('username')}
          variant='filled' color='secondary' label='Nama anda' fullWidth sx={{mt:3}} />
        <TextField
          {...inputProps('content')}
          variant='filled'
          color='secondary'
          label='Komentar anda'
          fullWidth sx={{mt:3}}
          InputProps={{
            disableUnderline: true,
            sx:{
              borderRadius: 3,
            }
          }}
          multiline
          rows={10}
        />
        <Button disabled={loading} variant='contained' color='secondary' type='submit' sx={{borderRadius: 3, mt: 3}} fullWidth>
          Simpan
        </Button>
      </form>
    </div>
  )
};
