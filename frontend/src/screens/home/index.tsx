import * as React from "react";
import { Base } from "../../layouts/base";
import { Banner } from "./banner";
import { FilterBar } from "./filter-bar";
import { usePaginator, PaginatorContext } from "../../hooks/use-paginator";
import { ProductList } from "./product-list";
import { observer } from "mobx-react";

export const Home = observer(() => {
  const paginator = usePaginator({
    path: "product",
  });
  return (
    <Base>
      <PaginatorContext.Provider value={paginator}>
        <Banner />
        <FilterBar />
        <ProductList />
      </PaginatorContext.Provider>
    </Base>
  );
});
