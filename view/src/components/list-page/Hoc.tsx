import {createContext, PureComponent, useContext} from "react";
import { IlistPage, IListPageState } from './type'
import {Inertia} from "@inertiajs/inertia";

type Props = {};
type State = IListPageState;
const ListPageContext = createContext<null| IlistPage>(null);

export function useListPage(){
  return useContext(ListPageContext) as IlistPage
}

export class Hoc extends PureComponent<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      params: {},
      sort: undefined,
      direction: undefined,
      contextMenu: null,
      entity: undefined
    }
  }

  runQuery = () => {
    const { params, direction, sort } = this.state;
    Inertia.get(window.location.pathname, {
      ...params,
      sort : sort ? sort: undefined,
      direction : direction ? direction : undefined
    } as Record<string, any>,{
      preserveState:true,
    })
  }

  updateSortOrder = (sort: string, direction: State['direction']) => {
    this.setState({
      ...this.state,
      sort : direction ? sort: undefined,
      direction
    }, this.runQuery)
  }

  updateParams = (merge: Record<string, any>) => {
    this.setState({
      ...this.state,
      params: {
        ...this.state.params,
        ...merge,
      }
    }, this.runQuery)
  }

  closeContextMenu = () => {
    this.setState({
      entity: null,
      contextMenu: null
    })
  }

  attachContextMenu = (point: Record<'x'| 'y', number>, entity: Record<string, any>) => {
    this.setState({
      contextMenu: point,
      entity,
    })
  }

  onContextMenu = (entity: any) => {
    return (event: any) => {
      this.closeContextMenu();
      event.preventDefault();
      this.attachContextMenu({
        x: event.clientX - 2,
        y: event.clientY - 4,
      }, entity)
    }
  }
  onControlClick = (entity: any) => {
    return (event: any)=>{
      this.closeContextMenu();
      const button : HTMLButtonElement = event.currentTarget;
      this.attachContextMenu({
        x : button.getBoundingClientRect().x - 2,
        y : button.getBoundingClientRect().y - 2,
      }, entity)
    }
  }

  getContext = () : IlistPage => [this.state, {
    updateParams: this.updateParams,
    updateSortOrder: this.updateSortOrder,
    onContextMenu: this.onContextMenu,
    onControlClick : this.onControlClick,
    closeContextMenu: this.closeContextMenu
  }]

  render() {
    return (
      <ListPageContext.Provider value={this.getContext()}>
        {this.props.children}
      </ListPageContext.Provider>
    );
  };
}
