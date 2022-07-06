import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Transaction from "App/Models/Transaction";
import {ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";
import { DateTime, } from 'luxon'

type Ranges = 'month' | 'daily';
type Ref = {
  [K : string] : string
}

type RangeQuery<T extends Ref> = T & {
  transactions: Transaction[],
}

type MakeMonthlyQueryReturn = RangeQuery<{
  month : string
}>
type MakeDailyQueryReturn = RangeQuery<{
  daily : string
}>

export class TransactionQuery {

  query: ModelQueryBuilderContract<typeof Transaction>

  constructor( protected context ?: HttpContextContract) {
    this.query = Transaction.query()
  }

  static makeRangeQuery = async<T>(type: Ranges) : Promise<T[]> => {
    const timesMap : Record<Ranges, number> = {
      month: 6,
      daily: 7
    }
    const payload : any [] = []
    const limit = timesMap[type];
    for (let i = 0; i < limit; i++) {
      let date = new Date();
      const query = new TransactionQuery();
      if (type === "month"){
        date.setMonth(
          date.getMonth() - i
        )
      }
      if (type === "daily"){
        const less = DateTime.fromJSDate(date).get('day') - i;
        date = DateTime.fromJSDate(
          date
        ).set({
          day : less
        }).toJSDate()
      }
      const startOf = type === "daily" ? 'day' : 'month'
      const start = DateTime.fromJSDate(date).startOf(startOf)
      const data = await query.withDates(
        [
          DateTime.fromJSDate(date).startOf(startOf),
          type === "daily" ? undefined : DateTime.fromJSDate(date).endOf(startOf)
        ]
      ).query;

      payload.push({
        [type]: type === "month"? `${start.monthLong} ${start.year}`: `${start.weekdayLong} ${start.day} ${start.monthShort}`,
        transactions: data
      })
    }
    return payload as T[];
  }
  static makeMonthlyQuery = async () : Promise<MakeMonthlyQueryReturn[]> => {
    return TransactionQuery.makeRangeQuery<MakeMonthlyQueryReturn>('month');
  }
  static makeDailyQuery = async () : Promise<MakeDailyQueryReturn[]> => {
    return TransactionQuery.makeRangeQuery<MakeDailyQueryReturn>('daily');
  }
  public withDates = (dates : [DateTime, DateTime| undefined]) => {
    const [ start, end ] = dates;
    this.query = this.query
      .where(
        'created_at', '>=', start.toSQLDate()
      )
    if (end){
      this.query = this.query.andWhere('created_at', '<=', end.toSQLDate());
    }
    return this;
  }

}
