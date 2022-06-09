import {useMediaQuery, useTheme} from "@mui/material";

export function useIsSm(){
  return useMediaQuery(useTheme().breakpoints.down("sm"))
}
