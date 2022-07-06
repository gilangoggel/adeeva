import {Button, Grid, Divider} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import { motion } from 'framer-motion'
import { Inertia } from "@inertiajs/inertia"
import voca from "voca";

type P = IProduct & {
  left: boolean
}

const makeAnimation = (left: boolean) => {
  return {
    transition:{
      x:{
        type: "tween",
        duration :0.5
      }
    },
    initial:{
      x: left ? '-100%' : '100%',
      opacity: 0
    },
    animate:{
      x: 0,
      opacity: 1
    },
    exit:{
      x: left ? '-100%' : '100%',
      opacity: 0
    }
  }
}

export const ImageContainer = ({image, name, price, left}: P) => {

  const handleClick = () => {
    const query = voca(name).replaceAll(" ", "_")
    return Inertia.get(`/product/${query}`)  }

  return (
    <Grid onClick={handleClick} component={motion.div} {...makeAnimation(left)} item xs={6} sx={sx as any} md={6}>
      <div className="img-container">
        <div
          style={{
            backgroundImage:`url(${image})`
          }}
          className="img"/>
      </div>
      <div className='name-container'>
        <h2 className='font-raleway'>
          {name}
        </h2>
      </div>
      <div className='info-container'>
        <p className='font-raleway price'>
          Rp {formatMoney(price)}
        </p>
        <div className="btn-container">
          <div>
            <Button className='font-raleway' variant='outlined' sx={{
              color:'inherit'
            }}>
              Tampilkan produk
            </Button>
            <div className="divider-container">
              <Divider className='divider'/>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};
const sx = {
  display: 'flex',
  flexDirection: "column",
  "& > .name-container":{
    mb: "auto",
    pt: 2
  },
  "& > .img-container":{
    display: 'flex',
    justifyContent: 'center',
    "& > .img":{
      cursor:"pointer",
      width:['100%',576],
      height: [256,576],
      backgroundPosition:'center',
      backgroundSize:["cover","contain"],
      backgroundRepeat:"no-repeat"
    },
  },
  textAlign:'center',
  "& .info-container":{
  },
  "& h2":{
    fontWeight:"light",
    cursor:"pointer",
    userSelect:"none",
    fontSize:['0.8rem', 'inherit']
  },
  "& .price":{
    my:2,
    fontWeight:"light",
    cursor:"pointer",
    userSelect:"none"
  },
  "& .btn-container":{
    display: 'flex',
    justifyContent: 'center',
    "& > div:hover":{
      "& .divider":{
        width: "100%"
      }
    }
  },
  "& .divider-container":{
    display: 'flex',
    mt: 1,
    justifyContent: 'center',
    "& .divider":{
      width: "60%",
      height: 1,
      transition : "all ease-in-out .5s",
      borderWidth:2
    }
  },
  "& button":{
    borderColor:"transparent",
    transition:"all ease 0.4s",
    py:1,
    "&:hover":{
      borderColor:"#a2a2a2",
    },
    fontWeight:"light"
  }
}
