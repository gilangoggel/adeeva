import {ProductList} from "@components/home/product-list";
import {HeaderSpacer} from "@components/header-spacer";

export const Recomendations = () => {
  return (
    <div>
      <HeaderSpacer>
        Rekomendasi produk
      </HeaderSpacer>
      <ProductList/>
    </div>
  );
};
