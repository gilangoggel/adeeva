import { ColumnProps } from '../type'
import {Box} from "@mui/material";

const sx= {
  height: 100,
  width : 100,
  backgroundPosition:'center',
  backgroundSize:"contain",
  borderRadius:1,
  backgroundRepeat:"no-repeat"
}

export const Image = ({entity, config : {key}} : ColumnProps) => {
  const src = entity[key as keyof typeof entity];
  return (
    <Box sx={{display:'flex', justifyContent: 'center'}}>
      <Box sx={sx} style={{
        backgroundImage:`url(${src})`,
      }}/>
    </Box>
  );
};
