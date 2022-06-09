import { TableTypes, FilteringCallback } from './type'
import {ContextAction} from "@components/list-page";
import { actions as order } from '@root/enums/columns/orders'
import { actions as shipment } from '@root/enums/columns/shipment'
import { actions as transactions } from '@root/enums/columns/transaction'
import { actions as retur } from '@root/enums/columns/retur'

const map: Record<TableTypes, ContextAction[]> = {
  order,
  retur,
  transactions,
  shipment
}

export const resolveActions : FilteringCallback<ContextAction> = (type, pageProps, filtering) => {
  const actions = filtering ? (map[type]).filter((c)=>filtering(
    c, pageProps
  )) : map[type];
  if (! actions.length) console.log(`Wait for implementation actions ${type}`);
  return actions;
}
