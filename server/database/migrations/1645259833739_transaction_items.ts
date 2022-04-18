import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TransactionItems extends BaseSchema {
  protected tableName = 'transaction_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned()
      table.integer('transaction_id').unsigned()
      table.integer('discount').unsigned().defaultTo(0)
      table.float('total').unsigned()
      table.float('sub_total').unsigned()
      table.float('amount').unsigned()
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
