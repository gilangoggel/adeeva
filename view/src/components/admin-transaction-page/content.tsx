import { Props } from './types'
import {observer} from "mobx-react";
import {ListPage} from "@components/list-page";
import {pageStore} from "./store";
import {useMemo} from "react";
import { Header } from './header'
import { TransactionContext } from '../transaction/context'

type P = Props & Record<string, any>

export const Content = observer( ({title ,columns = [], actions, children ,...props}: P) => {
  const store = useMemo(()=>{
    return pageStore.create()
  } , []);
  return (
    <>
      <ListPage
        title={title}
        onAction={store.rowHandlers}
        columns={columns}
        customAction={actions}
        filter={Header}
        disabledAction={['delete', 'edit', 'update', 'show']}
        {...props.paginator as any}
      />
      <TransactionContext.Provider value={store.transaction as any}>
        {
         children? children(store.childprops) : null
        }
      </TransactionContext.Provider>
    </>
  );
});
