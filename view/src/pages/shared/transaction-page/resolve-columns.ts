import { TableTypes, FilteringCallback } from './type'

import { config as order } from '@root/enums/columns/orders'
import { config as shipment } from '@root/enums/columns/shipment'
import { config as transactions } from '@root/enums/columns/transaction'
import { config as retur } from '@root/enums/columns/retur'
import {Column} from "@components/list-page";

const columns : Record<TableTypes, Column<any>[]> = {
  order,
  shipment,
  retur,
  transactions
}

export const resolveColumns : FilteringCallback<Column<any>> = (types: TableTypes, pageProps, filtering) => {
  const initial = columns[types];
  const column = filtering ? initial.filter(c=>filtering(c, pageProps)) : initial;
  if (! column.length) alert(`wait for implementation ${types}`)
  return column;
}
