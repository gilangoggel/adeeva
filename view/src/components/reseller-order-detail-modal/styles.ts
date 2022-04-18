export const entityContextSx = {
  display: 'flex', "& > div": { width: "50%" }
}
export const contextSx = {
  '.title':{
    p: 2,
    bgcolor:'primary.main',
    color:'white',
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-between"
  },
  "& button:not(.icon-button)":{
    mt: 2,
    textTransform: "none",
    borderRadius: 2
  },
  '& h2':{
    mb: 0
  }
}

export const contentItemSx = {
  display: 'flex',
  "& > .img-container":{
    minHeight: '128px',
    minWidth: '128px',
    backgroundSize:"contain",
  },
  border: "solid 1px",
  borderColor: "#e1e1e1",
  borderRadius: 1,
  py: 1,
  "& > .content":{
    "& > div":{
      px: 2,
    }
  },
  "& .head":{
    fontWeight:"bolder"
  },
}
