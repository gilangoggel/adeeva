import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import ResellerProduct from "App/Models/ResellerProduct";
import Reseller from "App/Models/Reseller";
import { checkTransactionStatus } from '../utility/check-transaction-status'
import {transactionQueries} from "App/Helper/transaction-functions";
import Transaction from "App/Models/Transaction";
import {TransactionStatus} from "App/Enums/payment-status";

export default class TransactionController{

  status = checkTransactionStatus

  complete = async  ({params : {id}} : HttpContextContract ) => {
    const transaction = await Transaction.find(id);
    if(transaction){
      transaction.setCompletions('customer');
      transaction.status = TransactionStatus.COMPLETED;
      await transaction.save();
    }
    return transaction;
  }

  all = ({ auth }: HttpContextContract) => {
    return transactionQueries().where(
      'customer_id', auth.user?.id as any
    ).orderBy('created_at', 'desc')
  }

  getBaseQuery = ({request}: HttpContextContract) => {
    const ids = request.input("items");
    return ResellerProduct.query()
      .where("stock", '!=', 0)
      .whereIn('product_id', ids)
      .preload('reseller', (p)=>p.preload("user"));
  }

  checkoutMeta= async (ctx : HttpContextContract) => {
    const resellers = await this.getResellerList(ctx);
    return {
      payload:{
        resellers
      },
    }
  }
  getResellerList =async (ctx: HttpContextContract) => {
    const q = await this.getBaseQuery(ctx)
      .distinct("reseller_id");
    const resellers = await Reseller.query().whereIn("id",
      q.map(item=>item.resellerId))
      .preload('productList', q=>q.preload("product"))
      .preload("user")
    return resellers.map(item=>{
      return item.serialize({
        fields:{
          pick: ['address', 'city_id', 'id']
        },
        relations:{
          user:{
            fields: ['name']
          },
          productList:{
            fields:["product", 'stock', 'id'], relations: {
              product:{
                fields: ['name', 'id', 'price', 'image']
              }
            }
          }
        }
      })
    }).map(({user:{name},productList ,...item})=>({
      ...item,
      name,
      products : productList.map(({stock, product})=>{
        return {
          stock,
          ...product,
        }
      }),
    }));
  }


}
