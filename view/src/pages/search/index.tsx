import * as React from 'react';
import { usePaginatorListener, PaginatorContext } from '@stores/paginator'
import {observer} from "mobx-react";
import { Filter } from './filter';
import { Layout } from './layout'
import {useIsSm} from "@hooks/use-is-sm";
import { PaginatorInfo, OrderField } from './paginator-info'
import { Content } from './content'
import { SideBar } from './side-bar'
import { QueryProvider } from './query-provider'
import { store } from './store'

export const Search = observer( (props: any) => {
  usePaginatorListener(store, props);
  const isSm = useIsSm()
  return (
    <PaginatorContext.Provider value={store}>
      <QueryProvider>
        <Layout
          info={PaginatorInfo}
          isSm={isSm}
          sidebarContent={SideBar}
          headerContent={Filter}
          orderField={OrderField}
        >
          <Content/>
        </Layout>
      </QueryProvider>
    </PaginatorContext.Provider>
  );
});
