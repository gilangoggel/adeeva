import * as React from 'react';
import {createContext, useContext} from "react";
import { store, AvailableQuery as State, UseQuery } from './store'

const Context = createContext<UseQuery| null>(null)
export function useQuery(){
  return useContext(Context) as UseQuery;
}

export class QueryProvider extends React.Component<any, State> {

  constructor(props : any) {
    super(props);
    this.state = {
      price: {
        max: 0,
        min: 0
      },
      keyword: "",
      category: "",
      order: "name"
    }
  }

  callback = ( page = 1 ) => {
    const { category, order, price : {max : maxPrice, min : minPrice}, keyword } = this.state;
    const params: Record<string, any> = {
      page
    };
    const apply = (name: string, value: any) => {
      if (value){
        params[name] = value
      }
    }
    apply('category', category);
    apply('maxPrice', maxPrice)
    apply('minPrice', minPrice)
    apply('order', order)
    apply('keyword', keyword)
    store.applyQuery(params);
  }

  changePrice = (n: number[]) => {
    const [ min, max ] = n
    this.setState({
      price: {min, max}
    }, this.callback)
  }

  changeOrder = (order : string) => {
    this.setState({
      order
    }, this.callback)
  }
  changeCategory = (category: string) => {
    const { category : current } = this.state;
    this.setState({
      category : current === category ? "" : category
    }, this.callback)
  }
  changeKeyword = (keyword: string) => {
    this.setState({
      keyword
    }, this.callback)
  }

  paginate = (n : number) => {
    this.callback( n )
  }

  getContext = () : UseQuery => [this.state, {
    changePrice: this.changePrice,
    changeOrder: this.changeOrder,
    changeCategory: this.changeCategory,
    changeKeyword: this.changeKeyword,
    paginate: this.paginate
  }]

  render() {
    return (
      <Context.Provider value={this.getContext()}>
        {this.props.children}
      </Context.Provider>
    );
  };
};
