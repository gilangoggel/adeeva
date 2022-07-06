import { Paper ,Box, Divider, Grid } from '@mui/material';
import { useDashboardData } from './hoc'
import {ReactNode} from "react";
import {formatMoney} from "@utils/format-money";
import { RangeChart } from './range-chart'
import { TopProductCart } from './top-product-cart'
import 'react-dates/initialize';
import { DateController } from './date-controller'

const Header = () => {
  return (
    <div>
      <Box sx={{display: 'flex', my : 1, alignItems: 'center'}}>
        <DateController/>
      </Box>
      <Divider sx={{mt:1}}/>
    </div>
  )
}

const paperSx = {
  bgcolor: "primary.main",
  color: "white",
  p: 2,
}

const Item = ({label, value} : Record<'label' | 'value', ReactNode>) => {
  return (
    <>
      <Paper sx={paperSx}>
        <h4 className='font-raleway'>
          {label}
        </h4>
        <Divider sx={{my:1}}/>
        <p className='font-poppins'>
          {value}
        </p>
      </Paper>
    </>
  )
}
export const Summary = () => {
  const [{meta}] = useDashboardData();

  const {
    total, times, median, highest, lowest
  } = meta;

  return (
    <>
      <Header/>
      <Grid container sx={{my:1, mb: 2}} spacing={2}>
        <Grid item md={9} sx={{display: 'flex'}}>
          <RangeChart/>
        </Grid>
        <Grid item md={3} sx={{display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <Item label='Pendapatan' value={`Rp ${formatMoney(total)}`} />
          <Item label='Penjualan' value={`${times} transaksi`} />
          <Item label='Rata-rata pendapatan / bulan' value={`Rp ${formatMoney(median)}`} />
          <Item label='Penjualan tertinggi' value={`Rp ${highest ? formatMoney(highest.sum) : "-"}`} />
          <Item label='Penjualan terendah' value={`Rp ${lowest ? formatMoney(lowest.sum) : "-"}`} />
        </Grid>
      </Grid>
      <TopProductCart/>
    </>
  );
};
