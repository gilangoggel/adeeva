import { Component } from 'react'
import {observer} from "mobx-react";
import { CartStoreType } from '@stores/cart-store'
import { CheckAvaibility } from '@utils/checkout/check-avaibility'
import { ResellerInfo } from '@utils/checkout/types'
import { UseCheckout } from './types'
import { CheckoutContext } from './context'

type Props = {
  products : number[]
};
type State = {
  resellers: ResellerInfo[]
  resellerOption : ResellerInfo | '__adeeva__'
};


const checkAvaibility = new CheckAvaibility();


class Node extends Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      resellers: [],
      resellerOption: '__adeeva__'
    }
  }
  checkAvaibility = async () => {
    const { products } = this.props;
    checkAvaibility.setProductIds(products);
    const resellers = await checkAvaibility.dispatch();
    this.setState({
      resellers: [...resellers]
    })
  }
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (!this.state.resellers.length && this.props.products.length){
      console.log('here')
      this.checkAvaibility();
    }
  }

  checkoutContext() : UseCheckout {
    return [this.state, {}]
  }
  render() {
    return (
      <CheckoutContext.Provider value={this.checkoutContext()}>
        {this.props.children}
      </CheckoutContext.Provider>
    );
  };
}
export const Provider = observer(Node);
