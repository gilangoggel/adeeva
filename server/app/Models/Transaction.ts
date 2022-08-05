import { DateTime } from 'luxon'
import {
  afterCreate,
  BaseModel, beforeSave,
  BelongsTo,
  belongsTo,
  column,
  computed,
  hasMany,
  HasMany,
  HasOne,
  hasOne
} from '@ioc:Adonis/Lucid/Orm'
import Items from './TransactionItem'
import TransactionMeta from "App/Models/TransactionMeta";
import User from "App/Models/User";
import Reseller from "App/Models/Reseller";
import Tracking from "App/Models/Tracking";
import {TrackingListeners} from "App/Helper/tracking-listeners";
import {TransactionStatus} from "App/Enums/payment-status";
import { OrderCreated } from 'App/Notification/order-created'
import TransactionRetur from "App/Models/TransactionRetur";
import TransactionOrderIsSending from "App/Notifications/TransactionOrderIsSending";
import TransactionOrderIsReceived from "App/Notifications/TransactionOrderIsReceived";

export default class Transaction extends BaseModel {
  /**
   * Relasi transaksi dan item transaksi
   */
  @hasMany(() => Items)
  public items: HasMany<typeof Items>
  @hasOne(() => TransactionMeta)
  public meta: HasOne<typeof TransactionMeta>
  @belongsTo(() => User, {
    foreignKey: "customerId"
  })
  public customer: BelongsTo<typeof User>
  @belongsTo(() => Reseller,{
    foreignKey: "resellerId"
  })
  public reseller: BelongsTo<typeof Reseller>

  @hasMany(() => Tracking)
  public trackings: HasMany<typeof Tracking>
  @hasOne(()=>TransactionRetur)
  public retur: HasOne<typeof TransactionRetur>

  /**
   * Attribute dari kolom database
   */
  @column({ isPrimary: true })
  public id: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  @column()
  public customerId: number
  @column()
  public cityId: number| string
  @column()
  public address: string
  @column()
  public name: string
  @column()
  public expedition?: string
  @column()
  public trackingNumber?: string
  @column()
  public resellerId?: number
  @column()
  public postalCode: string
  @column()
  public total: number
  @column()
  public status: number | string
  @column()
  public shippingCost: number
  @column({
    serializeAs: null,
    consume(val){
      if (! val) return {};
      return JSON.parse(val)
    },
    prepare(val){
      if (! val) {
        val = {};
      }
      if (typeof val === "string"){
        return val;
      }
      return JSON.stringify(val)
    }
  })

  public customs : Record<string, any>


  @computed({})
  public get completionMessage(){
    return this.customs.completion_message?? ""
  }
  @computed()
  public get completedByCustomer(){
    return this.isCompletedBy('customer')
  }
  @computed()
  public get completedByReseller(){
    return this.isCompletedBy('reseller')
  }
  @computed()
  public get completedByAdmin(){
    return this.isCompletedBy('admin')
  }

  private isCompletedBy(key: 'customer' | 'admin' | 'reseller'){
    const customKey = `completedBy${key}`;
    return Boolean(this.customs[customKey])
  }

  public setCompletions(key: 'customer' | 'admin' | 'reseller', value : boolean = true){
    const customKey = `completedBy${key}`;
    this.customs[customKey] = value
  }

  static CompleteByReseller = async (self: Transaction, message: string) => {
    self.customs['completionMessage'] = message;
    self.setCompletions('reseller')
    await self.save();
    await TrackingListeners.onResellerCompletion(self)
  }

  static CompleteByAdmin = async (self: Transaction) => {
    await self.save();
    self.setCompletions('admin')
    await TrackingListeners.onAdminCompletion(self)
  }

  @afterCreate()
  static OnCreated = OrderCreated.run;

  @beforeSave()
  static onTransactionCompleted = async (self: Transaction) => {
    if(self.resellerId && self.$dirty['status'] && self.$dirty['status'] == TransactionStatus.COMPLETED){
      await self.load("customer");
      await self.load("reseller", p=>p.preload('user'));
      await Reseller.increaseResellerBalance(self);
    }
  }

  @beforeSave()
  static onConfirmedByReseller = async (self: Transaction) => {
    if(self.resellerId && self.$dirty['status'] && self.$dirty['status'] == TransactionStatus.SENDING){
      await self.load("customer");
      await self.load("reseller", p=>p.preload('user'));
      const { customer } = self;
      customer.notify(new TransactionOrderIsSending(self));
    }
  }
  @beforeSave()
  static onTransactionCompletedByReseller = async (self: Transaction) => {
    if(self.resellerId && self.$dirty['status'] && self.$dirty['status'] == TransactionStatus.RECEIVED_TO_CUSTOMER){
      await self.load("customer");
      await self.load("reseller", p=>p.preload('user'));
      const { customer } = self;
      customer.notify(new TransactionOrderIsReceived(self));
    }
  }

  @beforeSave()
  public static whenPaymentUpdated = async (self: Transaction) => {
    const isPrevWait = self.$dirty['status'] && self.$original['status'] === TransactionStatus.WAIT_FOR_PAYMENT;
    /**
     * Kirim notifikasi kalo status sebelumnya menuggu pembayaran
     * dan status pembayaran udah di verfikasi midtrans
     * @autorun
     * user/transaction-controller.check
     * admin/order-controller.checkStatus.checkStatus
     */
    if (isPrevWait){
      await TrackingListeners.onPaymentUpdated(self)
    }
  }

  static orderCheryPick(){
    return {
      relations: {
        reseller:{
          fields:{
            pick:["address", 'contact'],
          },
          relations:{
            user:{
              fields:['name', 'id']
            }
          }
        },
        customer:{
          fields: ["id", 'name']
        },
        items:{
          fields:{
            omit:['created_at', 'updated_at', 'product_id', 'transaction_id'],
          }
        },
        meta:{
          fields:{
            omit: ["created_at"]
          }
        }
      }
    }
  }
}
