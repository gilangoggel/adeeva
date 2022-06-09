import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {relationHelper} from "App/Utiities/relation-helper";

export default class ResellerTransaction extends BaseSchema {
  protected tableName = 'reseller_transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('reseller_id').unsigned().nullable()
      table.integer('customer_id').unsigned().nullable()
      table.integer('transaction_id').unsigned().nullable()
      table.integer('status').defaultTo(1)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true });
      const relations = [
        ["resellers", 'reseller_id',],
        ["users", 'customer_id'],
        ["transactions", 'transaction_id'],
      ]
      relations.forEach(item=>{
        const [ on, key ] = item;
        relationHelper(table, {
          on, key
        })
      })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
