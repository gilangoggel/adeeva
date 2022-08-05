import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Transaction from "App/Models/Transaction";
import {ModelQueryBuilderContract} from "@ioc:Adonis/Lucid/Orm";
import { DateTime, } from 'luxon'
// @ts-ignore
import {TransactionStatus} from "App/Enums/payment-status";

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
      /**
       * @unblock
       * kalau mau liat transaksi tanda status complete
       */
      // .where('status', '=', TransactionStatus.COMPLETED);
  }

  withReseller = async () => {
    if(this.context?.auth!.user){
      const user = this.context?.auth!.user;
      if (user.role === "RESELLER"){
        await user.load('reseller');
        this.query = this.query.where('reseller_id', '=', user.reseller.id);
      }
    }
  }

  static resolveRangeLimit = async ({request}: HttpContextContract, mode: Ranges) => {
    const start = request.input('start' , null);
    const end = request.input('end' , null);
    const timesMap : Record<Ranges, number> = {
      month: 6,
      daily: 7
    }
    if (! start || ! end) return timesMap[mode];
    const diff = DateTime.fromISO(
      end
    ).diff(DateTime.fromISO(start), mode === "daily" ? 'day' : 'month');
    const diffValue = mode === "daily" ? diff.days : diff.months;
    if (diffValue > 14 && mode === "daily") return 14;
    return diffValue;
  }

  static makeRangeQuery = async<T>(type: Ranges, context: HttpContextContract) : Promise<T[]> => {
    const payload : any [] = []
    const limit = await TransactionQuery.resolveRangeLimit(context, type);
    if (limit < 1){
      return []
    }
    const startInput = context.request.input("end")

    for (let i = 0; i < limit; i++) {
      let date = startInput ? DateTime.fromISO(startInput).toJSDate() : new Date();
      const query = new TransactionQuery(context);
      await query.withReseller();

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
      let data = await query.withDates(
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
  static makeMonthlyQuery = async (context: HttpContextContract) : Promise<MakeMonthlyQueryReturn[]> => {
    return TransactionQuery.makeRangeQuery<MakeMonthlyQueryReturn>('month', context);
  }
  static makeDailyQuery = async (context: HttpContextContract) : Promise<MakeDailyQueryReturn[]> => {
    return TransactionQuery.makeRangeQuery<MakeDailyQueryReturn>('daily', context);
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
