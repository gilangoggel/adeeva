export const rootSx = {
  pt: [6,10],
  display: "flex",
  justifyContent:'center',
  "& > .container":{
    width: ['80%', '60%'],
    bgcolor:"primary.light",
    boxShadow:3,
    display: "flex",
    p: 2,
    "& > .form-container":{
      width : ["100%","50%"]
    },
    '& > .welcome-text':{

    },
  },
  '& h1':{
    fontWeight:"normal",
    color:'white'
  },
  "& .field-container":{
    py :2
  }
}
