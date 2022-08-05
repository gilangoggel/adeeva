import Profile from "App/Models/Profile";
import Reseller from "App/Models/Reseller";
import { cities } from 'App/Enums/cities'
import transactionDataGen from "./transaction_data_gen";
import Transaction from "App/Models/Transaction";
import ResellerTransaction from "App/Models/ResellerTransaction";

type GetUserAndReseller = {
  user: Profile,
  reseller: Reseller,
}

export default class ResellerTransactionSeeder{

  getUserAndResellerInCity = async (cityId: any) : Promise<GetUserAndReseller> =>{
    const user = await Profile.query().where('city_id', cityId).first();
    const reseller = await Reseller.query().where('city_id', cityId).first();
    if(! user || ! reseller) throw new Error('plese run user seeder first');
    await user.load("user");
    return {
      user: user,
      reseller: reseller
    }
  }

  createResellerTransactionInstace = async  (transaction: Transaction) => {
    const instance = new ResellerTransaction();
    instance.fill({
      customerId: transaction.customerId,
      resellerId: transaction.resellerId as any,
      transactionId: transaction.id,
      status: 0
    });
    await instance.save();
  }

  private clearDb = async () => {
    await ResellerTransaction.truncate(true);
    await Transaction.truncate(true);
  }

  run = async () => {
    await this.clearDb();
    for (let i = 0; i < 5; i++){
      const data = await Promise.all( cities.map( async (item)=>{
        const { user, reseller } = await this.getUserAndResellerInCity(item.city_id);
        return transactionDataGen(user, reseller);
      }));
      const transactions = await Transaction.createMany(data);
      await Promise.all(transactions.map(this.createResellerTransactionInstace));
    }
  }
}
