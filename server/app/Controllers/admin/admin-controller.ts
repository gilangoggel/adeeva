import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TransactionQuery } from 'App/Helper/dashboard/transaction-query'
import { topProductQuery } from 'App/Helper/dashboard/top-product-query'
import { chain } from 'lodash'

export default class AdminController {
  index = async (context: HttpContextContract) => {
    const { inertia } = context;
    const monthly = TransactionQuery.makeMonthlyQuery();
    const daily = TransactionQuery.makeDailyQuery();
    const topSales = chain(await topProductQuery()).orderBy('count').take(5).value() ;
    return inertia.render('admin.dashboard', {
      monthly,
      daily,
      topSales
    })
  }
}
