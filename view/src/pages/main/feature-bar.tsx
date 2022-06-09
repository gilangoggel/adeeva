import {Box, Grid, Container} from "@mui/material";
import {HeaderSpacer} from "@components/header-spacer";

const sx = {
  py: 4,
  "& h1":{
    fontWeight:"light"
  },
  "& .item":{
    "& p":{
      fontSize:"2rem",
      color:'white'
    },
    "& .mask":{
      position : "absolute",
      top:0,
      left:0,
      height: "100%",
      width :'100%',
      bgcolor:'rgba(0,0,0,0.14)',
      zIndex: 1,
    },
    "& .container":{
      "& .content":{
        zIndex: 2,
      },
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
      height: [256,512],
      backgroundSize:"cover",
      backgroundPosition:"center",
      position: 'relative',
    },
    // color: "white",
    // pt: 3,
    // pb:2,
    // transition: "all ease-in-out .3s",
    // cursor: "pointer",
    // "&:hover":{
    //   borderRadius:3,
    //   bgcolor:'white',
    //   color: "primary.dark",
    //   boxShadow:5
    // }
  }
}

const CategoryBar = [
  {
    label : "Makanan",
    value: "fnb"
  },
  {
    label : "Pakaian",
    value: "clothes"
  },
  {
    label : "Produk kecantikan",
    value: "skincare"
  },
];

const Item = ({value, label}: any) => {
  return (
    <Grid className='item' item xs={12} md={4} sx={{
      textAlign:'center',
    }}>
      <div
        style={{backgroundImage: `url(/assets/${value}.jpg)`}}
        className='container'
      >
        <div className="mask"/>
        <div className="content">
          <p className='font-poppins'>
            {label}
          </p>
        </div>
      </div>
    </Grid>
  )
}


export const FeatureBar = () => {
  return (
    <Box sx={sx}>
      <Container sx={{textAlign: "center", "& > h1":{mb: 5}}}>
        <Box sx={{py:2}}>
          <HeaderSpacer>
            Kategori produk
          </HeaderSpacer>
        </Box>
        <Grid container spacing={3}>
          {
            CategoryBar.map(item=>(
              <Item {...item} key={item.value}/>
            ))
          }
        </Grid>
      </Container>
    </Box>
  );
};
