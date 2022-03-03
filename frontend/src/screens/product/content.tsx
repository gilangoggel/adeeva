import * as React from "react";
import { useProductPage } from "./provider";
import {
  Box,
  Divider,
  Container,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import defaultImg from "../../assets/product.png";
import { ArrowRight } from "@mui/icons-material";
import { moneyFormat } from "../../utilities/money-format";
import { ProductInfo } from "./product-info";
import { Recomendation } from "./recomendation";
import { Checkout } from "./checkout";

const Breadcrumb = () => {
  const {
    product: { category, name },
  } = useProductPage();
  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs separator={<ArrowRight />}>
        <Link
          color="inherit"
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Home
        </Link>
        <Link
          color="inherit"
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {category}
        </Link>
        <Typography>{name}</Typography>
      </Breadcrumbs>
    </Box>
  );
};
export const Content = () => {
  const { product } = useProductPage();
  return (
    <Container sx={{ mt: 4, pt: 5 }}>
      <Breadcrumb />
      <Grid container spacing={1}>
        <Grid item sm={12} md={4}>
          <Box
            component="img"
            sx={{ width: "100%" }}
            src={product.image ? product.image : defaultImg}
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <ProductInfo />
        </Grid>
        <Grid item sm={12} md={4}>
          <Checkout />
        </Grid>
      </Grid>
      <Recomendation />
    </Container>
  );
};
