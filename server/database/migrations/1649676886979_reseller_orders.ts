import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ResellerOrderStatus } from 'App/Enums/reseller-order-status'
import {relationHelper} from "App/Utiities/relation-helper";

export default class ResellerOrders extends BaseSchema {
  protected tableName = 'reseller_orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned()
      table.integer('reseller_id').unsigned()
      table.string('expedition').nullable()
      table.string('delivery_recipt_number').nullable()
      table.json('extras')
      table.integer('total').unsigned()
      table
        .enum('status', [
          ResellerOrderStatus.PENDING,
          ResellerOrderStatus.SHIPMENT,
          ResellerOrderStatus.FINISH,
        ])
        .defaultTo(ResellerOrderStatus.PENDING)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.timestamps(true,true);
      relationHelper(table, {
        on: "resellers",
        key: "reseller_id"
      })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
