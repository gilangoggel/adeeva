import * as React from 'react';
import {Inertia} from "@inertiajs/inertia";
import voca from 'voca'


type Actions = Record<'navigateToProduct'| 'addToWishlist' | 'addToCart', ()=>void> & {
  addToChartWithAmount(n: number) : void
}

type UseProduct = [IProduct, Actions]

const ProductContext = React.createContext<null| UseProduct>(null);
export function useProduct(){
  return React.useContext(ProductContext) as UseProduct
}

export class ProductUtilsProvider extends React.Component<IProduct> {


  navigateToProduct = () => {
    const query = voca(this.props.name).replaceAll(" ", "_")
    return Inertia.get(`/product/${query}`)
  }
  onAddToWishlist = () => {
    console.log('todo add to wishlist')
  }
  onAddToCart = () => {
    console.log('todo add to cart')
  }

  onAddToChartWithN = (n : number) => {
    console.log(n)
  }

  getContext = () : UseProduct => [
    this.props,
    {
      addToCart: this.onAddToCart,
      addToWishlist: this.onAddToWishlist,
      navigateToProduct: this.navigateToProduct,
      addToChartWithAmount: this.onAddToChartWithN
    }
  ]
  render() {
    return (
      <ProductContext.Provider value={this.getContext()}>
        {this.props.children}
      </ProductContext.Provider>
    );
  };
};
