import {Box, FormControlLabel, Switch} from '@mui/material'
import {useToggle} from "@hooks/use-toggle";

type Props = {
  callback(v: "online" | "offline") : void
}

export const OnlineControl = ({callback}: Props) => {
  const [ online, toggle ] = useToggle(true);
  const handleChange = () => {
    callback(online ? 'online' : "offline")
    toggle();
  }
  return (
    <Box sx={{position : "sticky", top: 0}}>
      <FormControlLabel onChange={handleChange} control={<Switch defaultChecked />} label={online ? "online" : "offline"} />
    </Box>
  );
};
