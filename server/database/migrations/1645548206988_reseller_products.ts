import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ResellerProducts extends BaseSchema {
  protected tableName = 'reseller_products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('reseller_id').unsigned()
      table.integer('product_id').unsigned()
      table.integer('stock').unsigned()
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
