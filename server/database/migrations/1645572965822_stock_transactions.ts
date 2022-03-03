import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StockTransactions extends BaseSchema {
  protected tableName = 'stock_transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('reseller_id')
      table.string('total')
      table.string('expedition')
      table.string('tracking_number')
      table.double('shipping_cost')
      table.boolean('received').defaultTo(false)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
