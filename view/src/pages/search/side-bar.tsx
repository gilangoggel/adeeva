import {memo, PropsWithChildren, useCallback, useState} from "react";
import { Divider, Slider, Box, Stack, Button } from '@mui/material'
import { useQuery } from './query-provider'
import {formatMoney} from "@utils/format-money";
import { CategoryList } from '@components/category-list'
import { useAfterSubmit } from './layout'

const FilterContainer = memo( ({ title, children }: PropsWithChildren<{title: string}>) => {
  return (
    <Box sx={{pb:3}}>
      <Box sx={{px: 2}}>
        <p className='font-raleway'>
          {title}
        </p>
        <Divider sx={{mt:1}}/>
      </Box>
      <div>
        {children}
      </div>
    </Box>
  )
}, (n, p)=>n.title === p.title)

const CategoryFilter = () => {
  const [ {category}, {changeCategory} ] = useQuery();
  const afterSubmit = useAfterSubmit();
  const handleChange = useCallback( (category) => {
    changeCategory(category);
    afterSubmit();
  }, [])
  return (
    <FilterContainer title='Kategori'>
      <Box sx={{px: 2, pt:1}}>
        <CategoryList handler={handleChange} selected={category} listProps={{dense:true, disablePadding: true}}/>
      </Box>
    </FilterContainer>
  )
}

const PriceFilter = () => {
  const [{price: {min, max}}, {changePrice}] = useQuery();
  const [internal, setInternal] = useState<number[]>(()=>[min, max])
  const afterSubmit = useAfterSubmit();
  const handleChange = (event: Event, newValue: number | number[]) => {
    setInternal(newValue as number[]);
  };
  const onSubmit = useCallback((e)=>{
    changePrice(internal);
    e.preventDefault();
    afterSubmit()
  }, [internal])
  return (
    <Box sx={{px:2}} component='form' onSubmit={onSubmit}>
      <Slider
        onChange={handleChange}
        size='small'
        value={internal}
      />
      <Stack className='font-poppins' justifyContent='space-between' direction='row'>
        <p>
          Rp {formatMoney(internal[0] * 10000)}
        </p>
        <p>
          Rp {formatMoney(internal[1] * 10000)}
        </p>
      </Stack>
      <Button variant='contained' sx={{my:1}} type='submit' size='small'>
        Terapkan
      </Button>
    </Box>
  )
}

export const SideBar = () => {

  return (
    <div style={{position: "sticky", top: 0, left: 0}}>
      <FilterContainer title='Harga'>
        <PriceFilter/>
      </FilterContainer>
      <CategoryFilter/>
    </div>
  );
};
