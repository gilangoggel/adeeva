import Transaction from "App/Models/Transaction";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {schema} from "@ioc:Adonis/Core/Validator";
import {TransactionStatus} from "App/Enums/payment-status";

export function transactionQueries(){
  return Transaction.query()
    .preload("meta")
    .preload("items", (q)=>q.preload("product"))
    .preload('reseller', (q)=>q.preload("user"))
    .preload('trackings')
    .preload("customer")
    .preload('retur');
}
export async function transactionLoader(transaction: Transaction){
  await transaction.load("meta")
  await transaction.load("items", q=>q.preload("product"))
  await transaction.load("reseller", q=>q.preload("user"))
  await transaction.load("trackings")
  await transaction.load("customer");
  return transaction;
}
export async function transactionCompletion(type :'reseller' | 'admin', {request, inertia}: HttpContextContract){
  if (type === "reseller"){
    await request.validate({
      schema: schema.create({
        message: schema.string()
      })
    });
  }
  const model = await Transaction.find(request.params().id);
  if (model){
    model.status = TransactionStatus.RECEIVED_TO_CUSTOMER;
    model.setCompletions("reseller", true);
    await model.save();
    if (type === "reseller")
    await Transaction.CompleteByReseller(model, request.input("message", ''));
    if (type === "admin"){
      await Transaction.CompleteByAdmin(model)
    }
  }
  return inertia.redirectBack();
}
