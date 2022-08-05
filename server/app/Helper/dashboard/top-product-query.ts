import Database from "@ioc:Adonis/Lucid/Database";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Transaction from "App/Models/Transaction";
import {DateTime} from "luxon";
import {TransactionStatus} from "App/Enums/payment-status";

export async function topProductQuery({request, auth}: HttpContextContract){

  let completedQuery = Transaction.query().where("status", '=', TransactionStatus.COMPLETED);
  if (auth.user!.role === "RESELLER"){
    await auth.user!.load("reseller");
    const transactionIds = await Transaction.query().where("reseller_id", '=', auth.user!.reseller.id);
    completedQuery = completedQuery.whereIn('reseller_id', transactionIds.map(item=>item.id));
  }
  // @ts-ignore
  const ids = await completedQuery;
  let q = Database
    .from('transaction_items')
    .join('products', 'products.id','transaction_items.product_id')
    /**
     * @unblock
     * kalau mau liat transaksi tanda status complete
     */
    // .whereIn("transaction_items.transaction_id",ids.map(item=>item.id))
    .select([
      'products.id',
      'products.name',
  ]).groupBy('product_id');
  const start = request.input('start', null)
  const end = request.input('end', null)
  const getTransactionIds = async (start: any,end : any) => {
    const transactionQuery = await Transaction.query().where(
      'created_at', '>=', DateTime.fromISO(start).toSQLDate()
    )
      .where(
        'created_at', '<=', DateTime.fromISO(end).toSQLDate()
      )
    return  transactionQuery.map(item=>item.id)
  }

  if (start && end){
    q = q
      .whereIn('transaction_items.transaction_id', await getTransactionIds(start, end))
  }
  return Promise.all((await q).map( async item=>{
    let q = Database.from('transaction_items').where(
      'product_id', item.id
    )
    if (start && end){
      q = q.whereIn('transaction_id', await getTransactionIds(start, end))
    }
    const count = await q.sum('amount', 'total')
    return {
      ...item,
      count : count[0].total
    }
  }))
}
