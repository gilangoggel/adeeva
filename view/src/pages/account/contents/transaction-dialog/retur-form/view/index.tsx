import {observer} from "mobx-react";
import { useTransactionDialog } from '../../context'
import { Grid, Divider, Chip, Box  } from '@mui/material'
import { CheckCircle  } from '@mui/icons-material'
import {ITransactionRetur} from "@models/transaction-extended/transaction-retur";

const sx = {
  my:3,
  mt:1,
  '& .header':{
    fontWeight:"bolder"
  },
  '& .img-container':{
    px:2
  },
  '& img':{
    cursor:"pointer",
    width: "100%",
    maxHeight: 256,
    transition: "all ease .2s",
    borderRadius:2,
    '&:hover':{
      boxShadow:2
    }
  },
}

const map = {
  tiki: "tiki.png",
  jne: "jne.jpg",
  pos:"pos.png"
}

const resolveImage = (expedition: string) => `/assets/expedition/${map[expedition as keyof typeof map]}`

const expeditionSx = {
  display: 'flex',
  '& img':{
    width: 50,
    borderRadius: '50%',
  },
  alignItems: 'center'
}


const ExpeditionView = () => {
  const [store] = useTransactionDialog();
  const retur = store.retur as ITransactionRetur;

  const getLabel = () => {
    if (retur.has_resended){
      return 'Barang telah dikirim ulang'
    }
    return "Segera akan dilakukan pengiriman ulang"
  }

  return (
    <>
      <Grid sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} item xs={6}>
        <Chip sx={{mb:2}} icon={<CheckCircle/>} label={getLabel()} color='secondary'/>
      </Grid>
      <Grid item xs={6}>
        <div className='img-container'>
          <p>
            Pengiriman
          </p>
          <Box sx={expeditionSx}>
            <img src={resolveImage(retur.expedition as string)} alt=""/>
            <p>
              {retur.tracking_number}
            </p>
          </Box>
        </div>
      </Grid>
    </>
  )
}

export const View = observer( () => {
  const [store] = useTransactionDialog();
  if (! store.retur){
    return <></>
  }
  const retur = store.retur;
  return (
    <Grid container spacing={2} sx={sx} className='font-raleway'>
      {
        retur.expedition && retur.tracking_number ?
          <ExpeditionView/> : null
      }
      <Grid item sm={6} className='font-raleway'>
        <div className="img-container">
          <p className="header">Foto yang anda upload</p>
          <Divider sx={{my:1}}/>
          <div className=''>
            <img src={retur.photo} alt=""/>
          </div>
        </div>
      </Grid>
      <Grid className='font-raleway' item sm={6}>
        <p className="header">Alasan pengembalian</p>
        <Divider sx={{my:1}}/>
        <p>
          {retur.reason}
        </p>
      </Grid>
    </Grid>
  );
});
