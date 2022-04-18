import * as React from 'react';
import {Button, Paper,Typography, ButtonGroup} from "@mui/material";
import { motion } from 'framer-motion'

type Props = {
  onConfirmed() : void
  onCancel() : void
  open: boolean
}

const sx = {
  '& button':{
    textTransform: "none",
  },
  minWidth: 500,
  p: 2,
  position: "fixed",
  bottom: (t: any)=>t.spacing(5),
  zIndex: (t: any)=>t.zIndex.appBar + 11,
  right: (t: any)=>t.spacing(5),
  borderRadius: 0,
  boxShadow: 3,
}

export const DeleteModal = ({open, onCancel, onConfirmed} : Props) => {
  return (
    <Paper
      component={motion.div}
      initial={{
        x:"100vw"
      }}
      animate={{
        x: !open ? '100vw' : 0
      }}
      transition={{
        x:{
          type: "tween",
          duration: 0.5
        }
      }}
      sx={sx}
    >
      <Typography className='font-poppins' variant='caption' sx={{display: "block"}}>
        Apakah anda yakin untuk menghapus data?
      </Typography>
      <ButtonGroup size='small' sx={{mt: 2}}>
        <Button color='error' onClick={onCancel}>
          Tutup
        </Button>
        <Button color='primary' onClick={onConfirmed}>
          Ya
        </Button>
      </ButtonGroup>
    </Paper>
  );
};
