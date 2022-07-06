import {usePage} from "@inertiajs/inertia-react";
import {SnapshotIn} from "mobx-state-tree";
import {ITransaction} from "@models/transaction-extended";
import {createContext, useContext, useMemo} from "react";
import { sumBy } from 'lodash'

type RangeReport = {
  label: string,
  transactions: SnapshotIn<ITransaction>[]
  sum: number
  count: number
}

function useTransformData(type: 'daily' | 'monthly') : RangeReport[] {
  const props  = usePage().props as any;
  const data = props[type];
  const memoizeData = useMemo(()=>{
    return data.map(
      (item : any)=>{
        return {
          label: item[type === 'monthly'? 'month' : type],
          transactions: item.transactions,
          sum: sumBy(
            item.transactions, 'total'
          ),
          count: item.transactions.length
        }
      }
    )
  }, [data])
  return memoizeData as RangeReport[]
}
function useReportData(){
  const months = useTransformData('monthly');
  const days = useTransformData('daily');
  return {
    months, days
  }
}
type DashboardData = {
  reports: Record<'months' | 'days', RangeReport[]>
}

export const Context = createContext<null| DashboardData>(null);

export function useDashboardProvider() : DashboardData {
  const reports = useReportData();
  return {
    reports
  }
}

export function useDashboardData(){
  return useContext(Context) as DashboardData;
}

