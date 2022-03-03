import * as React from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import { UserMenu } from "./user-menu";

const sx = {
  position: "relative",
  "& > .logo": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  "& > .page-title": {
    mr: "auto",
    fontWeight: "bold",
  },
  "& > .user-control": {
    display: "flex",
  },
  color: "white",
};

export const Header = React.forwardRef(({}, ref) => {
  return (
    <Box ref={ref} component="header" sx={{ bgcolor: "primary.main" }}>
      <Toolbar sx={sx as any}>
        <Typography className="page-title">Backoffice</Typography>
        <Box className="user-control">
          <UserMenu />
        </Box>
        <Typography className="logo" variant="h6" sx={{ fontWeight: "bolder" }}>
          Adeeva group
        </Typography>
      </Toolbar>
    </Box>
  );
});
