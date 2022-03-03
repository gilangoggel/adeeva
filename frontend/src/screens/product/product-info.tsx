import * as React from "react";
import { Box, Typography } from "@mui/material";
import { moneyFormat } from "../../utilities/money-format";
import { useProductPage } from "./provider";

export const ProductInfo = () => {
  const { product } = useProductPage();
  return (
    <div>
      <Typography sx={{ fontWeight: "bolder" }}>{product.name}</Typography>
      <Typography variant="caption">{product.category}</Typography>
      <Typography variant="h4" sx={{ fontWeight: "bolder" }}>
        Rp {moneyFormat(product.price)}
      </Typography>
      <Box
        sx={{
          my: 2,
          py: 1,
          borderTop: "solid 1px",
          borderBottom: "solid 1px",
          borderColor: "#d6d6d6",
        }}
      >
        <Typography variant="body2">Deskripsi produk</Typography>
      </Box>
      <Typography variant="caption">{product.description}</Typography>
    </div>
  );
};
