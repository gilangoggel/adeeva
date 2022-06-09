import {TableTypes, Props, FilterActions, FilterColumns} from "./type";
import { TransactionPage} from './transaction-page'
import { observer } from 'mobx-react'

type Config = {
  title: string
  tableType: TableTypes
  contents:Props['content'],
  filterAction?: FilterActions
  filterColumn?: FilterColumns
}

export function builder({ tableType, title, contents, filterAction, filterColumn }: Config){
  const Factory = (props: Record<string, any>) => {
    return <TransactionPage
      filterAction={filterAction}
      filterColumns={filterColumn}
      pageProps={props}
      content={contents}
      title={title}
      type={tableType}
      {...props}
    />
  }
  return observer(Factory);
}
