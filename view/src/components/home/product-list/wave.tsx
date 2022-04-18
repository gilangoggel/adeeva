import {Box} from "@mui/material";

const sx = {
  position: "absolute",
  top:0,
  left: 0,
  width: "100%",
  height: "100%",
  '& img':{
    height: "100%",
    width: "100%"
  },
  zIndex: -2,
}

export const Wave = ({ reverse }: {reverse?:boolean}) => {
  return (
    <Box sx={sx} className="wave">
      <img src={`/assets/wave${reverse ? '-reverse': ''}.png`} alt=""/>
    </Box>
  );
};
