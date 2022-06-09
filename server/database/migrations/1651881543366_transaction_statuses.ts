import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {relationHelper} from "App/Utiities/relation-helper";

export default class TransactionStatuses extends BaseSchema {
  protected tableName = 'transaction_metas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').comment(
        `id from midtrans`
      ).primary()
      table.integer('transaction_id').comment(
        `Trasaction id from internal database`
      ).unsigned()
      table.string('merchant_id')
      table.string("gross_amount")
      table.string("payment_type")
      table.string("aquirer").nullable()
      table.string("bill_key").nullable()
      table.string("biller_code").nullable()
      table.json('va_numbers').defaultTo(JSON.stringify([]))
      table.json('actions').defaultTo(JSON.stringify([]))
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      relationHelper(table, {
        on: "transactions",
        key: "transaction_id"
      })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
