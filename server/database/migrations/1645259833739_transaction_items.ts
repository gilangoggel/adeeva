import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {relationHelper} from "App/Utiities/relation-helper";

export default class TransactionItems extends BaseSchema {
  protected tableName = 'transaction_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned()
      table.integer('transaction_id').unsigned()
      table.integer('discount').unsigned().defaultTo(0)
      table.double('total').unsigned()
      table.double('sub_total').unsigned()
      table.double('amount').unsigned()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      relationHelper(table, {key: "product_id", on: "products"})
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
