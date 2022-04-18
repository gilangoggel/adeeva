export const rootSx = {
  pt: [6,10],
  display: "flex",
  justifyContent:'center',
  "& > .container":{
    width: ['80%', '60%'],
    bgcolor:"primary.main",
    display: "flex",
    p: 2,
    "& > .form-container":{
      width : "50%"
    },
    '& > .welcome-text':{

    },
  },
  '& h1':{
    fontWeight:"normal"
  },
  "& .field-container":{
    py :2
  }
}
