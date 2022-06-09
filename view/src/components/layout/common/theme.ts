import { createTheme } from '@mui/material'

export const appTheme = createTheme({
  components:{
    MuiButton:{
      styleOverrides:{
        root:{
          textTransform:"none",
          borderRadius: 0,
          "&:hover":{
            color:'white',
            borderColor:'inherit',
          }
        },
      }
    }
  }
})
