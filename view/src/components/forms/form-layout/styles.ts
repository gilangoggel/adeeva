export const animation = {
  animate:{
    opacity: 1,
  },
  initial:{
    opacity: 0,
  }
}
export const sx = {
  mt: 3,
  "& .paper":{
    p: 2,
    mb: 3,
    boxShadow: 1,
    borderRadius:0,
    "&:not(.flex)":{
      width: ['100%', '50%', '40%'],
    },
    fontFamily:"Poppins",
    "& h3":{
      fontWeight: 'normal',
      color:"primary.dark",
      mb: 2,
    },
    "& > .field":{
      mb: 2,
      "&:last-of-type":{
        mb:0
      }
    }
  },
  "& h2":{
    color:"primary.dark",
    fontWeight:"700",
  },
  "& .divider":{
    bgcolor: "primary.light",
    my: 2,
    height: 1
  }
}
