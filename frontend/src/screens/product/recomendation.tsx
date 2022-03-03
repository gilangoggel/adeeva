import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useProductPage } from "./provider";
import { ProductCard } from "../../components/product-card";

export const Recomendation = () => {
  const { recomendation } = useProductPage();
  return (
    <div>
      <Box
        sx={{
          my: 2,
          py: 1,
          borderTop: "solid 1px",
          borderBottom: "solid 1px",
          borderColor: "#d6d6d6",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bolder" }}>
          Rekomendasi produk
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {recomendation.map((item) => (
          <Grid item key={item.id} sm={12} md={3}>
            <ProductCard {...item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
