export const infoSx = {
  px: 2,
  flex:1,
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: 'flex-start',
  position:"relative",
  "&[data-hidden='true']":{
    opacity:0
  },
  opacity: 1,
  "& .sticky":{
    top: (t: any)=>t.spacing(3),
    left:0,
    position: "sticky"
  },
  '& .box':{
    width: "80%",
    mb:2,
    "& > div":{
      px: 1,
      "& > div":{
        p: 1,
        bgcolor:'white',
        boxShadow: 1,
      },
    },
    '& .title':{
      color:'primary.main'
    },
    '& .content':{
      fontWeight: 'normal'
    }
  }
}


export const itemSx = {
  "&:not(:last-of-type)":{
    mb: 2,
  },
  fontFamily:"Poppins",
  "& > .flex":{
    display: 'flex',
  },
  "& small":{
    fontWeight:"bolder"
  },
  "& img":{
    height: 256,
    width: 256,
    borderRadius:2,
  },
  "& .content":{
    flex:1,
    "& > div":{
      px: 2
    }
  },
  "& .info-container":{
    display: 'flex',
    flexWrap:"wrap",
    "& > div":{
      width: "50%",
      mb: 1,
    }
  },
  '& .control':{
    py: 1,
    display: 'flex',
    border: "solid 1px",
    borderColor: 'primary.main',
    borderRadius: 2,
    px: 1,
    justifyContent:"space-between",
    "& button":{
      boxShadow:4,
    },
    "& .amount":{
      mx: 2,
      mb: 0,
    },
    '& .amount-controller':{
      display: 'flex',
      flexDirection:"row-reverse",
      alignItems:'center'
    }
  }
}
