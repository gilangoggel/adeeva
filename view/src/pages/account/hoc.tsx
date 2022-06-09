import * as React from 'react';
import { Actions, Values, UseAccount } from './types'

type Props = {};

type State = {
  tab: string
};

const Context = React.createContext<UseAccount| null>(null)

export function useAccount(): UseAccount{
  return React.useContext(Context) as UseAccount;
}

export class Hoc extends React.Component<Props, State> {

  constructor(props : any) {
    super(props);
    this.state = {
      tab: "account"
    }
  }

  changeTab = (tab: string) => this.setState({
    tab
  })

  getContext = () : UseAccount => [
    this.state,
    {
      changeTab: this.changeTab
    }
  ]

  render() {
    return (
      <Context.Provider value={this.getContext()}>
        {this.props.children}
      </Context.Provider>
    );
  };
};
