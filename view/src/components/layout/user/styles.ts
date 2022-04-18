export const toolbarSx = {
  "& > .logo":{
    display: ['none', 'block'],
    cursor: "pointer",
  },
  "& > .controls":{
    "& svg":{
      color:"primary.dark"
    }
  },
  "& > .searchbar":{
    flex : 1,
    "& > div":{
      p: [0,2]
    }
  },
  "& h1":{
    fontWeight:"normal"
  }
}
export const inputSx = {
  bgcolor:"white",
  "&.Mui-focused":{
    bgcolor:"white"
  },
  "&:hover":{
    bgcolor:"white"
  }
}
