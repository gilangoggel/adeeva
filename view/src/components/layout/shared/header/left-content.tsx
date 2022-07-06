import { IconButton, Box } from '@mui/material'
import { Menu } from '@mui/icons-material'

export const LeftContent = () => {
  return (
    <Box sx={{p:2}}>
      <IconButton>
        <Menu/>
      </IconButton>
    </Box>
  );
};
