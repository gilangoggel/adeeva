import * as React from 'react';
import {Inertia} from "@inertiajs/inertia";
import voca from 'voca'
import { userCartStore } from '@stores/cart-store'


type Actions = Record<'navigateToProduct'| 'addToWishlist' | 'addToCart' | 'moveToCart', ()=>void> & {
  addToChartWithAmount(n: number) : void
  isWishlistDisabled() : boolean
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
    userCartStore.push(this.props, 1, true)
  }
  isWishlistDisabled = () => {
    const find = userCartStore.items.find(item=>item.id === this.props.id);
    const wishlist = userCartStore.wishlists.find(item=>item.id === this.props.id);
    return Boolean(find || wishlist)
  }
  moveTocart(){
    const wishlist = userCartStore.wishlists.find(item=>item.id === this.props.id);
    if (wishlist){
      wishlist.moveToChart()
    }
  }


  onAddToCart = () => {
    userCartStore.push(this.props, 1)
  }
  onAddToChartWithN = (n : number) => {
    userCartStore.push(this.props, n)
  }
  getContext = () : UseProduct => [
    this.props,
    {
      addToCart: this.onAddToCart,
      addToWishlist: this.onAddToWishlist,
      navigateToProduct: this.navigateToProduct,
      addToChartWithAmount: this.onAddToChartWithN,
      isWishlistDisabled: this.isWishlistDisabled,
      moveToCart:this.moveTocart
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
