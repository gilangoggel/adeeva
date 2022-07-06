import {createContext, PureComponent, useContext} from 'react';
import {SnapshotIn} from "mobx-state-tree";
import {ITransaction} from "@models/transaction-extended";
import {orderBy, sortBy, sumBy} from "lodash";


type RangeReport = {
  label: string,
  transactions: SnapshotIn<ITransaction>[]
  sum: number
  count: number
}

type TopSale = {
  name: string
  label: string
  value: number
}

type Metadata = {
  times: number
  total: number
  median: number
  highest: RangeReport
  lowest: RangeReport
}
type State = {
  reports : Record<'daily'| 'monthly', RangeReport[]>
  topSales: TopSale[]
  meta: Metadata
  disableMonthly : boolean
};

function transformTopSales({topSales} : any ){
  return topSales.map((item : any)=>({
    value: item.count,
    label: item.name,
    id: item.name
  }))
}

function transformRangeData({daily, monthly}: any, mode : 'month' | 'day') : RangeReport[] {
  const data = mode === "month" ? monthly: daily;
  const labelKey = mode === "month" ? 'month' : 'daily';
  return data.map((item: any)=>({
    transactions: item.transactions,
    sum: sumBy(
      item.transactions, 'total'
    ),
    count: item.transactions.length,
    label: item[labelKey]
  }))
}

function getMetadata(months: RangeReport[]) : Metadata {
  const total = sumBy(months, 'sum');
  const times = sumBy(months, 'count');
  const median = Math.round((total? total : 1) / (times ? times : 1));
  const highest = orderBy(months, 'sum', 'desc')[0];
  const lowest = orderBy(months, 'sum')[0];
  return {
    total, times, median, highest, lowest
  }
}

type UseDashboardData = [
  State, (v: any) => void
]

const Context = createContext<null| UseDashboardData>(null);

export function useDashboardData(){
  return useContext(Context) as UseDashboardData
}

export class Hoc extends PureComponent<any, State> {

  constructor(props : any) {
    super(props);
    this.state = {
      reports: {
        monthly : [],
        daily : [],
      },
      topSales: [],
      meta: getMetadata([]),
      disableMonthly: false,
    }
  }

  setup = (pageProps: any) => {
    const monthly = transformRangeData(pageProps, 'month')
    this.setState({
      reports: {
        monthly,
        daily : transformRangeData(pageProps, 'day'),
      },
      topSales: sortBy(transformTopSales(pageProps), 'value'),
      meta: getMetadata(monthly)
    })
  }

  render() {
    return (
      <Context.Provider value={[this.state, this.setup]}>
        {this.props.children}
      </Context.Provider>
    );
  };
}
