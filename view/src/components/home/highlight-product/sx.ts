export const sx = {
  "& h1":{
    fontWeight:"lighter",
    fontSize: ['2rem',"3rem"],
    py: [1,2],
    textAlign:['center', 'left']
  },
  minHeight: "60vh",
  "& > .product-view":{
    display: 'flex',
    flexDirection: ['column', 'row'],
    pt: 5,
    '& > .display':{
      width: ['100%', '60%'],
      minHeight: 500,
      display: 'flex',
      alignItems:'center',
    },
    "& > .content":{
      width: ['100%', '40%']
    }
  },
}
