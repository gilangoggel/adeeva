import * as React from "react";
import { Box, Typography } from "@mui/material";

const sx = {
  height: "50vh",
  bgcolor: "primary.main",
  boxShadow: 2,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const Banner = () => {
  return (
    <Box sx={sx}>
      <div>
        <Typography align="center" variant="h3" sx={{ fontWeight: "bolder" }}>
          Selamat datang
        </Typography>
        <Typography align="center">
          Silahkan pilih berbagai macam produk pilihan dengan kualitas terbaik
          dari kami
        </Typography>
      </div>
    </Box>
  );
};
