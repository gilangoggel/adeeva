export const qtyFormSx = {
  '& > .info':{
    mt: 2,
    display: 'flex',
    '& > .price':{
      width: "60%",
      display: 'flex',
      justifyContent: "center",
      alignItems: 'center',
      bgcolor:'primary.main',
      color:'white'
    },
    '& .btn':{
      width: "40%",
      display:"block", flexDirection:"column", '& > *':{
        display: "block",
        textAlign:'center'
      },
      textTransform: "none",
      borderTopLeftRadius:0,
      borderBottomLeftRadius:0,
    }
  },
  '& .title':{
    fontWeight:"lighter"
  },
  '& .control':{
    display: 'flex',
    borderRadius: 2,
    '& > button':{
      '&:first-of-type':{
        borderRight:"none",
        borderBottomRightRadius:0,
        borderTopRightRadius:0,
      },
      '&:last-of-type':{
        borderLeft:"none",
        borderBottomLeftRadius:0,
        borderTopLeftRadius:0,

      },
    },
    '& .view':{
      border: "solid 1px",
      borderColor:"primary.light",
      display: 'flex',
      alignItems:'center',
      justifyContent:'center'
    },
    '& > *':{
      flex: 1
    }
  },
}
