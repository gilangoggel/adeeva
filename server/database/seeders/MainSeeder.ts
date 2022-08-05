import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {CustomerUserSeeder} from "../../seeder/user_seeder/customer_user_seeder";
import {ResellerUserSeeder} from "../../seeder/user_seeder/reseller_user_seeder";
import User from "App/Models/User";
import Profile from "App/Models/Profile";
import Reseller from "App/Models/Reseller";
import ResellerTransactionSeeder from "../../seeder/reseller_transaction_seeder";
import * as datagen  from '../../seeder/transaction_data_gen'
import Transaction from "App/Models/Transaction";
import TransactionItem from "App/Models/TransactionItem";
import TransactionMeta from "App/Models/TransactionMeta";
import ResellerTransaction from "App/Models/ResellerTransaction";
import {sumBy} from "lodash";
import * as faker from 'minifaker';
import {DateTime} from "luxon";
import Notification from "App/Models/Notification";
import Tracking from "App/Models/Tracking";
import ResellerProductSeeder from "../../seeder/reseller_product_seeder";
import ResellerProduct from "App/Models/ResellerProduct";

export default class MainSeederSeeder extends BaseSeeder {

  private models = [
    TransactionItem,
    TransactionMeta,
    ResellerTransaction,
    Transaction,
    ResellerProduct,
    Reseller,
    Notification,
    Tracking,
    Profile,
  ];


  private makeModel = <T>(data, modelClass) => {
    const model = new modelClass();
    model.fill(data);
    return model as T;
  }
  private updateUuid =  async (user: User, data: any)=>{
    user.id = data['id'];
    await user.save();
    return user;
  }

  private createAndAssignProfiles = async (users: any[]) => {
    let  items = await User.createMany( users.map(dt=>this.makeModel<User>(dt, User)));
    await Promise.all(items.map((user, index)=> this.updateUuid(user, users[index])));
  }

  private setupTransactionData = async () => {
    const transactions = await Transaction.all();
    let items : datagen.TransactionItemGen[] = [];
    let metas : datagen.MetaDataGen[] = [];
    for (const index in transactions){
      const transaction = transactions[index];
      const result = await datagen.generateMetaAndItems(transactions[index]);
      items = [...items,...result.items];
      metas = [...metas, result.meta];
      transaction.total = sumBy(result.items, 'total');
      const now = DateTime.now();
      const date = faker.date({
        from: DateTime.now().set({month :now.month - 3 }).toJSDate(),
        to: now.toJSDate()
      })
      transaction.createdAt = DateTime.fromJSDate(date);
      await transaction.save();
    }
    const itemModels = items.map(dt=>this.makeModel<TransactionItem>(dt, TransactionItem));
    const metaModels = metas.map(dt=>this.makeModel<TransactionMeta>(dt, TransactionMeta));
    await TransactionMeta.createMany(metaModels);
    await TransactionItem.createMany(itemModels);
  }

  private clearDb = async () => {
    for (const index in this.models){
      await this.models[index].truncate(true);
    }
    await User.query().where('id', '!=', 1).delete();
  }

  seedCustomer = async () => {
    const customerUserSeeder = new CustomerUserSeeder();
    return  customerUserSeeder.run();
  }
  seedResellers = async () => {
    const resellerUserSeeder = new ResellerUserSeeder();
    return  resellerUserSeeder.run();
  }

  seed = async  () => {
    const customers = await this.seedCustomer();

    await this.createAndAssignProfiles(customers.users);

    const resellers = await this.seedResellers();
    await this.createAndAssignProfiles(resellers.users);

    await Profile.createMany(customers.profiles.map(dt=>this.makeModel(dt, Profile)));
    await Reseller.createMany(resellers.resellers.map(dt=>this.makeModel<Reseller>(dt, Reseller)));
    const resellerTransactionSeeder = new ResellerTransactionSeeder();
    await resellerTransactionSeeder.run();
    await this.setupTransactionData();
    await ResellerProductSeeder.run();

  }

  public async run () {
    await this.clearDb();
    await this.seed();
  }
}
