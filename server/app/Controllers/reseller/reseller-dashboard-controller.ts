import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {TransactionQuery} from "App/Helper/dashboard/transaction-query";
import {chain} from "lodash";
import {topProductQuery} from "App/Helper/dashboard/top-product-query";

export default class ResellerDashboardController {

  index = async (context: HttpContextContract) => {
    const { inertia } = context;
    const monthly = TransactionQuery.makeMonthlyQuery(context);

    const daily = TransactionQuery.makeDailyQuery(context);

    const topSales = chain(await topProductQuery(context)).orderBy('count').take(5).value();

    await context.auth.user!.load("reseller");

    return inertia.render('reseller.dashboard', {
      monthly,
      daily,
      topSales,
      reseller: context.auth.user!.reseller
    })
  }
}
