import {Divider, Paper, useTheme, ButtonGroup, Button} from "@mui/material";
import {ResponsiveLine} from "@nivo/line";
import { useDashboardData } from './hoc'
import {useEffect, useMemo, useState} from "react";

const sliceTooltip = (item: any) => {
  return (
    <Paper sx={{p:1}}>
      {
        item.slice.points.map((item: any)=>(
          <div key={item.id}>
            <small className='font-poppins'>
              {item.data.xFormatted}
            </small>
            <Divider/>
            <p className='font-poppins'>
              {item.data.yFormatted}
            </p>
          </div>
        ))
      }
    </Paper>
  )
}
const commonProps = {
  curve: "monotoneX",
  animate: true,
  enableSlices:"x",
  enableArea:true,
  margin:{
    top: 20,
    right: 40,
    bottom: 60,
    left: 80
  },
  sliceTooltip,
  colors: {
    datum: "color"
  },
  yFormat:(value : any) =>
    `Rp ${Number(value).toLocaleString('id-ID', {
      minimumFractionDigits: 2,
    })}`,
  yScale:{
    type: 'linear',
  },
  axisBottom:{
    tickRotation: -28,
  },
  axisLeft:{
    format: (v: any)=>{
      return `Rp. ${v / 1000000} juta`
    }
  }
}


export const RangeChart = () => {
  const theme = useTheme();
  const [mode, setMode] = useState<'daily' | 'month'>('daily');
  const [{ reports, disableMonthly }] = useDashboardData();
  const data = useMemo(()=>{
    const items = mode === 'daily' ? reports.daily : reports.monthly;
    return items.map((item)=>({
      x: item.label,
      y: item.sum
    }))
  }, [mode,reports])
  useEffect(()=>{
    if (mode === "month" && disableMonthly){
      setMode("daily")
    }
  }, [disableMonthly, mode])
  return (
    <>
      <Paper sx={{p:1, flex: 1, display: 'flex', flexDirection: 'column'}}>
        <ButtonGroup>
          <Button variant={mode === "daily" ? 'contained' : 'outlined'} onClick={()=>setMode('daily')}>
            harian
          </Button>
          <Button
            disabled={disableMonthly}
            variant={mode === "month" ? 'contained' : 'outlined'}
            onClick={()=>setMode('month')}
          >
            Bulanan
          </Button>
        </ButtonGroup>
        <div style={{width: "100%", height: 500, cursor:"pointer"}}>
          <ResponsiveLine data={[
            {
              id: "base",
              color : theme.palette.primary.main,
              data
            }
          ]} {...commonProps as any}/>
        </div>
      </Paper>
    </>
  );
};
