// @flow
import * as React from "react";
import { createContext, useContext } from "react";

type Props = {};
type State = {
  mode: "create" | "update" | "delete" | "detail" | null;
  entity: null | Record<string, any>;
};

type ProductPage = State & {
  openModal(form: State["mode"], entity: State["entity"]): void;
  closeModal(): void;
};

const PageProvider = createContext<ProductPage | null>(null);

export function useProductPage(): ProductPage {
  return useContext(PageProvider) as ProductPage;
}

export class Provider extends React.Component<Props, State> {
  openModal: ProductPage["openModal"] = (mode, entity) => {
    this.setState({
      mode,
      entity,
    });
  };

  closeModal = () =>
    this.setState({
      mode: null,
      entity: null,
    });

  getContext = (): ProductPage => {
    return {
      ...this.state,
      openModal: this.openModal,
      closeModal: this.closeModal,
    };
  };

  render() {
    return (
      <PageProvider.Provider value={this.getContext()}>
        {this.props.children}
      </PageProvider.Provider>
    );
  }
}
