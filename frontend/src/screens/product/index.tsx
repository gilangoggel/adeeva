import * as React from "react";
import { Base } from "../../layouts/base";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useApi } from "../../hooks/use-api";
import { IProduct } from "../../types/product";
import { observer } from "mobx-react";
import { ProductPageContext } from "./provider";
import { toJS } from "mobx";
import { Content } from "./content";

type R = {
  product: IProduct;
  recomendation: IProduct[];
};

export const Product = observer(() => {
  const location = useLocation();
  const { state } = location;
  const nav = useNavigate();
  const [{ response }, run] = useApi<R>({
    // @ts-ignore
    path: `product/${state ? state.productId : ""}`,
  });

  useEffect(() => {
    // @ts-ignore
    if (!state || !state.productId) {
      nav("/");
      return;
    }
    run({});
  }, [state]);
  return (
    <Base>
      {!response ? null : (
        <ProductPageContext.Provider value={toJS(response) as any}>
          <Content />
        </ProductPageContext.Provider>
      )}
    </Base>
  );
});
