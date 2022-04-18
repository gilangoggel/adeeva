import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StockTransactionItems extends BaseSchema {
  protected tableName = 'stock_transaction_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('transaction_id').unsigned()
      table.integer('product_id').unsigned()
      table.integer('amount').unsigned()
      table.double('total')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.timestamps(true,true);
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
