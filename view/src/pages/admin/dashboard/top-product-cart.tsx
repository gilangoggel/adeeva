import {Grid, Paper} from "@mui/material";
import { ResponsivePie } from '@nivo/pie';
import { useDashboardData } from './hoc'

export const TopProductCart = () => {
  const [{ topSales : sorted }] = useDashboardData();
  return (
    <Paper sx={{p:2, mb:10}}>
      <h1 style={{marginBottom: '1rem'}} className='font-raleway'>
        Produk terlaris
      </h1>
      <Grid container spacing={2}>
        <Grid item md={4}>
          {
            sorted.map((item: any)=>(
              <Paper sx={{p:2, mb:2, bgcolor:'primary.main', color:'white'}} key={item.id}>
                <p className='font-poppins'>
                  {item.label}
                </p>
                <p className='font-poppins'>
                  {item.value} x
                </p>
              </Paper>
            ))
          }
        </Grid>
        <Grid item md={8}>
          <div style={{width: '100%', height: 400}}>
            <ResponsivePie
              data={sorted}
              colors={{ scheme: 'nivo' }}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3} fit
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: 'color',
                modifiers: [
                  [
                    'darker',
                    0.2
                  ]
                ]
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                  [
                    'darker',
                    2
                  ]
                ]
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};
