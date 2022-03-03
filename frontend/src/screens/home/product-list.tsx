import * as React from "react";
import { observer } from "mobx-react";
import { usePaginatorContext } from "../../hooks/use-paginator";
import { Container, Grid } from "@mui/material";
import { ProductCard } from "../../components/product-card";

export const ProductList = observer(() => {
  const [data] = usePaginatorContext();
  return (
    <Container sx={{ pt: 5, mt: 5 }}>
      <Grid container spacing={1}>
        {data.map((item) => {
          return (
            <Grid key={item.id} sx={{ cursor: "pointer" }} item sm={12} md={3}>
              <ProductCard {...item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
});
